# templates

项目模板

## 项目创建命令

使用 `curl`
```bash
curl -sSL https://raw.githubusercontent.com/qoxop/templates/main/create.sh | bash -s -- -p=项目模板名称 -n=项目名称 -t=标签名称-可选
```

使用 `wget`
```bash
wget -O - https://raw.githubusercontent.com/qoxop/templates/main/create.sh | bash -s -- -p=项目模板名称 -n=项目名称 -t=标签名称-可选
```

## 模板列表

### Chrome 插件项目

```bash
curl -sSL https://raw.githubusercontent.com/qoxop/templates/main/create.sh | bash -s -- -p=chrome-extension -n=my-chrome-extension
```