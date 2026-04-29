#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { sampleStack } from "./sampleStack";

const app = new cdk.App();

// 削除ポリシー
cdk.RemovalPolicies.of(app).destroy();

// タグ
cdk.Tags.of(app).add("CreatedBy", "CDK-playground");

new sampleStack(app, "sampleStack", {});