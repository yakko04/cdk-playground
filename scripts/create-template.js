#!/usr/bin/env node
const fs = require("node:fs");
const path = require("node:path");

const stackName = process.argv[2];
if (!stackName) {
	console.error("Usage: create-template.js <stack-name>");
	process.exit(1);
}

const outputDir = path.join(
	process.cwd(),
	"src",
	"stacks",
	`${stackName}Stack`,
);
fs.mkdirSync(outputDir, { recursive: true });

// テンプレ読み込み用
const templateDir = path.join(__dirname, "../templates");

// app.ts
const appTemplate = fs.readFileSync(
	path.join(templateDir, "app.ts.template"),
	"utf-8",
);
const appContent = appTemplate.replace(/__STACK_NAME__/g, stackName);
fs.writeFileSync(path.join(outputDir, "app.ts"), appContent);

// stack.ts
const stackTemplate = fs.readFileSync(
	path.join(templateDir, "stack.ts.template"),
	"utf-8",
);
const stackContent = stackTemplate.replace(/__STACK_NAME__/g, stackName);
fs.writeFileSync(path.join(outputDir, `${stackName}Stack.ts`), stackContent);

console.log(`Created new CDK stack in: src/stacks/${stackName}`);
