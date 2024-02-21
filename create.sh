#!/bin/bash

# 参数解析
for arg in "$@"
do
    case $arg in
        -p=*|--project=*)
        PROJECT="${arg#*=}"
        shift # Remove --project from processing
        ;;
        -n=*|--name=*)
        NAME="${arg#*=}"
        shift # Remove --name from processing
        ;;
        -t=*|--tag=*)
        TAG="${arg#*=}"
        shift # Remove --tag from processing
        ;;
        *)
        OTHER_ARGUMENTS+=("$1")
        shift # Remove generic argument from processing
        ;;
    esac
done

# 如果没有提供-name参数，则将其设置为与 project 相同的值
if [ -z "$NAME" ]; then
    NAME=$PROJECT
fi

# 检查是否提供了必要的参数
if [ -z "$PROJECT" ]; then
    echo "Error: Project name is required."
    exit 1
fi

# 创建临时目录并克隆git仓库
TEMP_DIR=$(mktemp -d)

# 根据是否指定了tag来执行不同的git clone操作
if [ -z "$TAG" ]; then
    # 如果没有指定tag，克隆主分支的最新提交
    git clone --depth 1 git@github.com:qoxop/templates.git "$TEMP_DIR"
else
    # 如果指定了tag，克隆特定的tag
    git clone --branch "$TAG" --depth 1 git@github.com:qoxop/templates.git "$TEMP_DIR"
fi

# 拷贝仓库中的packages目录到当前目录中的指定名称目录
if [ -d "$TEMP_DIR/packages/$PROJECT" ]; then
    cp -r "$TEMP_DIR/packages/$PROJECT" "./$NAME"
else
    echo "Error: Project '$PROJECT' does not exist in the repository."
    exit 1
fi

# 删除临时目录
rm -rf "$TEMP_DIR"

# 遍历项目目录中的所有 JSON 文件
find "./$NAME" -type f -name "*.json" -print0 | while IFS= read -r -d $'\0' file; do
    # 使用 sed 命令替换文件中的 __PACKAGE_NAME__ 字符串为指定的项目名称
    sed -i '' "s/__PACKAGE_NAME__/$NAME/g" "$file"
done

echo "Done. '$PROJECT' has been copied to './$NAME'."
