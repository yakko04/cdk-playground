import * as cdk from "aws-cdk-lib";
import { Vpc } from "aws-cdk-lib/aws-ec2";
import {
	AlternateTarget,
	Cluster,
	ContainerImage,
	DeploymentStrategy,
	FargateService,
	FargateTaskDefinition,
	Protocol,
	ListenerRuleConfiguration,
} from "aws-cdk-lib/aws-ecs";
import {
	ApplicationListenerRule,
	ApplicationLoadBalancer,
	ApplicationProtocol,
	ApplicationTargetGroup,
	ListenerAction,
	ListenerCondition,
	TargetType,
} from "aws-cdk-lib/aws-elasticloadbalancingv2";
import type { Construct } from "constructs";

export class ecsBgDeployStack extends cdk.Stack {
	constructor(scope: Construct, id: string, props?: cdk.StackProps) {
		super(scope, id, props);
		// 以下にリソースを記述
		// VPC
		const vpc = new Vpc(this, "Vpc", {
			maxAzs: 2,
		});

		// Cluster
		const cluster = new Cluster(this, "Cluster", {
			vpc,
		});
		// ECS Task Def
		const taskDefinition = new FargateTaskDefinition(this, "TaskDef", {
			cpu: 256,
			memoryLimitMiB: 512,
		});
		taskDefinition.addContainer("Nginx", {
			image: ContainerImage.fromRegistry("nginx:latest"),
			portMappings: [{ containerPort: 80 }],
			environment: {
				dummy: "dummy",
			},
		});

		// ALB
		const alb = new ApplicationLoadBalancer(this, "Alb", {
			vpc,
			internetFacing: true,
		});
		const prodListener = alb.addListener("ProdListener", {
			port: 80,
			defaultAction: ListenerAction.fixedResponse(404),
		});

		// Target Group (for B/G)
		const blueTg = new ApplicationTargetGroup(this, "BlueGroup", {
			vpc,
			port: 80,
			protocol: ApplicationProtocol.HTTP,
			targetType: TargetType.IP,
			healthCheck: { path: "/" },
		});
		const greenTg = new ApplicationTargetGroup(this, "GreenGroup", {
			vpc,
			port: 80,
			protocol: ApplicationProtocol.HTTP,
			targetType: TargetType.IP,
			healthCheck: { path: "/" },
		});
		// Listner Rule
		const prodRule = new ApplicationListenerRule(this, "ProdRule", {
			listener: prodListener,
			priority: 101,
			conditions: [ListenerCondition.pathPatterns(["*"])],
			targetGroups: [blueTg], // At first Blue 100%
		});

		// ECS Service
		const service = new FargateService(this, "Service", {
			cluster,
			taskDefinition,
			deploymentStrategy: DeploymentStrategy.BLUE_GREEN,
			bakeTime: cdk.Duration.minutes(5),
		});

		// ALB紐づけ
		const target = service.loadBalancerTarget({
			containerName: "Nginx",
			containerPort: 80,
			protocol: Protocol.TCP,
			alternateTarget: new AlternateTarget("AlternateTarget", {
				alternateTargetGroup: greenTg,
				productionListener:
					ListenerRuleConfiguration.applicationListenerRule(prodRule),
			}),
		});

		target.attachToApplicationTargetGroup(blueTg);
	}
}
