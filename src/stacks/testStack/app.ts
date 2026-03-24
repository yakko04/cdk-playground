import * as cdk from "aws-cdk-lib";
import { testStack } from "./testStack";

const app = new cdk.App();

// 削除ポリシー
cdk.RemovalPolicies.of(app).destroy();

// タグ
cdk.Tags.of(app).add("CreatedBy", "CDK-playground");

new testStack(app, "testStack", {});
