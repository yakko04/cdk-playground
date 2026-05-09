#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { ecsBgDeployStack } from "./ecsBgDeployStack";

const app = new cdk.App();

// 削除ポリシー
cdk.RemovalPolicies.of(app).destroy();

// タグ
cdk.Tags.of(app).add("CreatedBy", "CDK-playground");

new ecsBgDeployStack(app, "ecsBgDeployStack", {});