import * as path from "node:path";
import * as cdk from "aws-cdk-lib";
import { DockerImageCode, DockerImageFunction } from "aws-cdk-lib/aws-lambda";
import type { Construct } from "constructs";

export class lambdaContainerImageStack extends cdk.Stack {
	constructor(scope: Construct, id: string, props?: cdk.StackProps) {
		super(scope, id, props);

		new DockerImageFunction(this, "PlaywrightSmokeTest", {
			code: DockerImageCode.fromImageAsset(path.join(__dirname, "lambda")),
			memorySize: 2048,
			timeout: cdk.Duration.seconds(300),
		});
	}
}
