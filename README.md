# parse-md-to-json
A node script to parse markdown file to json

## Getting Started

Simply run parseMDtoJSON with node, change the input sourse file and ouput file in it.
```
node parseMDtoJSON.js
```

input:
```
// Read data from the source md file
var data = fs.readFileSync('./SUMMARY.md');
```
ouput:
```
fs.writeFileSync('./manifest.json', JSON.stringify(global_array));
```

### Prerequisites

All you need is to install node

## markdown format

Default indent is 2 space

```
* [总则](README.md)
  * [发展计划](plan.md)
* [产品规范](guideline/README.md)
  * [产品原则](guideline/principle.md)
  * [设计模式](guideline/pattern.md)
  * [产品约定](guideline/appoint/README.md)
    * [文档规则](guideline/appoint/doc_rule/README.md)
      * [模板 \| 系统设计文档](guideline/appoint/doc_rule/SDD_template.md)
      * [模板 \| 需求迭代文档](guideline/appoint/doc_rule/PRD_template.md)
```