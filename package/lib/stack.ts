import * as apigwv2 from "@aws-cdk/aws-apigatewayv2"
import * as cdk from "@aws-cdk/core"
import * as iam from "@aws-cdk/aws-iam"
import * as integrations from "@aws-cdk/aws-apigatewayv2-integrations"
import * as lambda from "@aws-cdk/aws-lambda"

type BffStackProps = cdk.StackProps & {
  project: string
  service: string
  version: string
  taskdir: string
}

export class BffStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props: BffStackProps) {
    super(scope, id, props)

    const api = new apigwv2.HttpApi(this, "Api", {
      apiName: props.stackName,
    })

    const code = lambda.Code.fromAsset(props.taskdir)

    const role = new iam.Role(this, "BffLambdaRole", {
      assumedBy: new iam.ServicePrincipal("lambda.amazonaws.com"),
    })

    const versionFunction = new lambda.Function(
      this,
      `VersionFunction${props.version}`,
      {
        functionName: props.stackName,
        runtime: lambda.Runtime.NODEJS_14_X,
        role,
        code,
        handler: "index.handler",
      }
    )

    const versionFunctionVersion = new lambda.Version(
      this,
      `VersionFunctionVersion${props.version}`,
      {
        lambda: versionFunction,
      }
    )

    const versionIntegration = new integrations.LambdaProxyIntegration({
      handler: versionFunctionVersion,
      payloadFormatVersion: apigwv2.PayloadFormatVersion.VERSION_1_0,
    })

    const versionRoute = new apigwv2.HttpRoute(
      this,
      `VersionRoute${props.version}`,
      {
        httpApi: api,
        integration: versionIntegration,
        routeKey: apigwv2.HttpRouteKey.with(
          `/${props.version}/{proxy+}`,
          apigwv2.HttpMethod.ANY
        ),
      }
    )

    const toRetain = [versionFunction, versionFunctionVersion, versionRoute]
    toRetain.forEach(construct => {
      cdk.Aspects.of(construct).add(new RemovalPolicyAspect())
    })
  }
}

class RemovalPolicyAspect implements cdk.IAspect {
  visit(node: cdk.IConstruct): void {
    const children = node.node.findAll()
    for (const child of children) {
      if (child instanceof cdk.CfnResource) {
        child.applyRemovalPolicy(cdk.RemovalPolicy.RETAIN)
      }
    }
  }
}
