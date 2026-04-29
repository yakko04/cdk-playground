#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { lambdaContainerImageStack } from "./lambdaContainerImageStack";

const app = new cdk.App();

// 削除ポリシー
cdk.RemovalPolicies.of(app).destroy();

// タグ
cdk.Tags.of(app).add("CreatedBy", "CDK-playground");

new lambdaContainerImageStack(app, "lambdaContainerImageStack", {});