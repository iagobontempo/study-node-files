Starting to migrate to typescript.

### FIRST
- Runned `tsc --init` to create tsconfig
    - At `tsconfig.json` AllowJS to ignore errors from js files without types
- Added typescript package and ts-node-dev to replace nodemon
- Added script at package.json to run ts-node-dev
- Added types from packages

### NEXT

- At `tsconfig.json`, changed:
    - "outDir": "./dist"
    - "rootDir": "./src" 
    - "target": "es2017" - For node development
    - "lib": ["es6"]
    - "removeComments": true
    - Added comment on "strict", to allow return NULL
    - "typeRoots": ["./node_modules/@types", "./src/@types"] - if we need to overight some type or create one custom
    - "resolveJsonModule": true, to allow import from json files

    
