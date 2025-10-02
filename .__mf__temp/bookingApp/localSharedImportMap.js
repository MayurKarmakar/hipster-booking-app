
// Windows temporarily needs this file, https://github.com/module-federation/vite/issues/68

    const importMap = {
      
        "@hookform/resolvers": async () => {
          let pkg = await import("__mf__virtual/bookingApp__prebuild___mf_0_hookform_mf_1_resolvers__prebuild__.js")
          return pkg
        }
      ,
        "@radix-ui/react-dialog": async () => {
          let pkg = await import("__mf__virtual/bookingApp__prebuild___mf_0_radix_mf_2_ui_mf_1_react_mf_2_dialog__prebuild__.js")
          return pkg
        }
      ,
        "@radix-ui/react-dropdown-menu": async () => {
          let pkg = await import("__mf__virtual/bookingApp__prebuild___mf_0_radix_mf_2_ui_mf_1_react_mf_2_dropdown_mf_2_menu__prebuild__.js")
          return pkg
        }
      ,
        "@radix-ui/react-label": async () => {
          let pkg = await import("__mf__virtual/bookingApp__prebuild___mf_0_radix_mf_2_ui_mf_1_react_mf_2_label__prebuild__.js")
          return pkg
        }
      ,
        "@radix-ui/react-select": async () => {
          let pkg = await import("__mf__virtual/bookingApp__prebuild___mf_0_radix_mf_2_ui_mf_1_react_mf_2_select__prebuild__.js")
          return pkg
        }
      ,
        "@radix-ui/react-slot": async () => {
          let pkg = await import("__mf__virtual/bookingApp__prebuild___mf_0_radix_mf_2_ui_mf_1_react_mf_2_slot__prebuild__.js")
          return pkg
        }
      ,
        "@radix-ui/react-tabs": async () => {
          let pkg = await import("__mf__virtual/bookingApp__prebuild___mf_0_radix_mf_2_ui_mf_1_react_mf_2_tabs__prebuild__.js")
          return pkg
        }
      ,
        "class-variance-authority": async () => {
          let pkg = await import("__mf__virtual/bookingApp__prebuild__class_mf_2_variance_mf_2_authority__prebuild__.js")
          return pkg
        }
      ,
        "clsx": async () => {
          let pkg = await import("__mf__virtual/bookingApp__prebuild__clsx__prebuild__.js")
          return pkg
        }
      ,
        "lucide-react": async () => {
          let pkg = await import("__mf__virtual/bookingApp__prebuild__lucide_mf_2_react__prebuild__.js")
          return pkg
        }
      ,
        "react": async () => {
          let pkg = await import("__mf__virtual/bookingApp__prebuild__react__prebuild__.js")
          return pkg
        }
      ,
        "react-dom": async () => {
          let pkg = await import("__mf__virtual/bookingApp__prebuild__react_mf_2_dom__prebuild__.js")
          return pkg
        }
      ,
        "react-hook-form": async () => {
          let pkg = await import("__mf__virtual/bookingApp__prebuild__react_mf_2_hook_mf_2_form__prebuild__.js")
          return pkg
        }
      ,
        "react-router-dom": async () => {
          let pkg = await import("__mf__virtual/bookingApp__prebuild__react_mf_2_router_mf_2_dom__prebuild__.js")
          return pkg
        }
      ,
        "tailwind-merge": async () => {
          let pkg = await import("__mf__virtual/bookingApp__prebuild__tailwind_mf_2_merge__prebuild__.js")
          return pkg
        }
      ,
        "zod": async () => {
          let pkg = await import("__mf__virtual/bookingApp__prebuild__zod__prebuild__.js")
          return pkg
        }
      
    }
      const usedShared = {
      
          "@hookform/resolvers": {
            name: "@hookform/resolvers",
            version: "5.2.2",
            scope: ["default"],
            loaded: false,
            from: "bookingApp",
            async get () {
              usedShared["@hookform/resolvers"].loaded = true
              const {"@hookform/resolvers": pkgDynamicImport} = importMap 
              const res = await pkgDynamicImport()
              const exportModule = {...res}
              // All npm packages pre-built by vite will be converted to esm
              Object.defineProperty(exportModule, "__esModule", {
                value: true,
                enumerable: false
              })
              return function () {
                return exportModule
              }
            },
            shareConfig: {
              singleton: false,
              requiredVersion: "^5.2.2"
            }
          }
        ,
          "@radix-ui/react-dialog": {
            name: "@radix-ui/react-dialog",
            version: "1.1.15",
            scope: ["default"],
            loaded: false,
            from: "bookingApp",
            async get () {
              usedShared["@radix-ui/react-dialog"].loaded = true
              const {"@radix-ui/react-dialog": pkgDynamicImport} = importMap 
              const res = await pkgDynamicImport()
              const exportModule = {...res}
              // All npm packages pre-built by vite will be converted to esm
              Object.defineProperty(exportModule, "__esModule", {
                value: true,
                enumerable: false
              })
              return function () {
                return exportModule
              }
            },
            shareConfig: {
              singleton: true,
              requiredVersion: "^1.1.15"
            }
          }
        ,
          "@radix-ui/react-dropdown-menu": {
            name: "@radix-ui/react-dropdown-menu",
            version: "2.1.16",
            scope: ["default"],
            loaded: false,
            from: "bookingApp",
            async get () {
              usedShared["@radix-ui/react-dropdown-menu"].loaded = true
              const {"@radix-ui/react-dropdown-menu": pkgDynamicImport} = importMap 
              const res = await pkgDynamicImport()
              const exportModule = {...res}
              // All npm packages pre-built by vite will be converted to esm
              Object.defineProperty(exportModule, "__esModule", {
                value: true,
                enumerable: false
              })
              return function () {
                return exportModule
              }
            },
            shareConfig: {
              singleton: true,
              requiredVersion: "^2.1.16"
            }
          }
        ,
          "@radix-ui/react-label": {
            name: "@radix-ui/react-label",
            version: "2.1.7",
            scope: ["default"],
            loaded: false,
            from: "bookingApp",
            async get () {
              usedShared["@radix-ui/react-label"].loaded = true
              const {"@radix-ui/react-label": pkgDynamicImport} = importMap 
              const res = await pkgDynamicImport()
              const exportModule = {...res}
              // All npm packages pre-built by vite will be converted to esm
              Object.defineProperty(exportModule, "__esModule", {
                value: true,
                enumerable: false
              })
              return function () {
                return exportModule
              }
            },
            shareConfig: {
              singleton: true,
              requiredVersion: "^2.1.7"
            }
          }
        ,
          "@radix-ui/react-select": {
            name: "@radix-ui/react-select",
            version: "2.2.6",
            scope: ["default"],
            loaded: false,
            from: "bookingApp",
            async get () {
              usedShared["@radix-ui/react-select"].loaded = true
              const {"@radix-ui/react-select": pkgDynamicImport} = importMap 
              const res = await pkgDynamicImport()
              const exportModule = {...res}
              // All npm packages pre-built by vite will be converted to esm
              Object.defineProperty(exportModule, "__esModule", {
                value: true,
                enumerable: false
              })
              return function () {
                return exportModule
              }
            },
            shareConfig: {
              singleton: true,
              requiredVersion: "^2.2.6"
            }
          }
        ,
          "@radix-ui/react-slot": {
            name: "@radix-ui/react-slot",
            version: "1.2.3",
            scope: ["default"],
            loaded: false,
            from: "bookingApp",
            async get () {
              usedShared["@radix-ui/react-slot"].loaded = true
              const {"@radix-ui/react-slot": pkgDynamicImport} = importMap 
              const res = await pkgDynamicImport()
              const exportModule = {...res}
              // All npm packages pre-built by vite will be converted to esm
              Object.defineProperty(exportModule, "__esModule", {
                value: true,
                enumerable: false
              })
              return function () {
                return exportModule
              }
            },
            shareConfig: {
              singleton: true,
              requiredVersion: "^1.2.3"
            }
          }
        ,
          "@radix-ui/react-tabs": {
            name: "@radix-ui/react-tabs",
            version: "1.1.13",
            scope: ["default"],
            loaded: false,
            from: "bookingApp",
            async get () {
              usedShared["@radix-ui/react-tabs"].loaded = true
              const {"@radix-ui/react-tabs": pkgDynamicImport} = importMap 
              const res = await pkgDynamicImport()
              const exportModule = {...res}
              // All npm packages pre-built by vite will be converted to esm
              Object.defineProperty(exportModule, "__esModule", {
                value: true,
                enumerable: false
              })
              return function () {
                return exportModule
              }
            },
            shareConfig: {
              singleton: true,
              requiredVersion: "^1.1.13"
            }
          }
        ,
          "class-variance-authority": {
            name: "class-variance-authority",
            version: "0.7.1",
            scope: ["default"],
            loaded: false,
            from: "bookingApp",
            async get () {
              usedShared["class-variance-authority"].loaded = true
              const {"class-variance-authority": pkgDynamicImport} = importMap 
              const res = await pkgDynamicImport()
              const exportModule = {...res}
              // All npm packages pre-built by vite will be converted to esm
              Object.defineProperty(exportModule, "__esModule", {
                value: true,
                enumerable: false
              })
              return function () {
                return exportModule
              }
            },
            shareConfig: {
              singleton: false,
              requiredVersion: "^0.7.1"
            }
          }
        ,
          "clsx": {
            name: "clsx",
            version: "2.1.1",
            scope: ["default"],
            loaded: false,
            from: "bookingApp",
            async get () {
              usedShared["clsx"].loaded = true
              const {"clsx": pkgDynamicImport} = importMap 
              const res = await pkgDynamicImport()
              const exportModule = {...res}
              // All npm packages pre-built by vite will be converted to esm
              Object.defineProperty(exportModule, "__esModule", {
                value: true,
                enumerable: false
              })
              return function () {
                return exportModule
              }
            },
            shareConfig: {
              singleton: false,
              requiredVersion: "^2.1.1"
            }
          }
        ,
          "lucide-react": {
            name: "lucide-react",
            version: "0.544.0",
            scope: ["default"],
            loaded: false,
            from: "bookingApp",
            async get () {
              usedShared["lucide-react"].loaded = true
              const {"lucide-react": pkgDynamicImport} = importMap 
              const res = await pkgDynamicImport()
              const exportModule = {...res}
              // All npm packages pre-built by vite will be converted to esm
              Object.defineProperty(exportModule, "__esModule", {
                value: true,
                enumerable: false
              })
              return function () {
                return exportModule
              }
            },
            shareConfig: {
              singleton: false,
              requiredVersion: "^0.544.0"
            }
          }
        ,
          "react": {
            name: "react",
            version: "19.1.1",
            scope: ["default"],
            loaded: false,
            from: "bookingApp",
            async get () {
              usedShared["react"].loaded = true
              const {"react": pkgDynamicImport} = importMap 
              const res = await pkgDynamicImport()
              const exportModule = {...res}
              // All npm packages pre-built by vite will be converted to esm
              Object.defineProperty(exportModule, "__esModule", {
                value: true,
                enumerable: false
              })
              return function () {
                return exportModule
              }
            },
            shareConfig: {
              singleton: true,
              requiredVersion: "^19.1.1"
            }
          }
        ,
          "react-dom": {
            name: "react-dom",
            version: "19.1.1",
            scope: ["default"],
            loaded: false,
            from: "bookingApp",
            async get () {
              usedShared["react-dom"].loaded = true
              const {"react-dom": pkgDynamicImport} = importMap 
              const res = await pkgDynamicImport()
              const exportModule = {...res}
              // All npm packages pre-built by vite will be converted to esm
              Object.defineProperty(exportModule, "__esModule", {
                value: true,
                enumerable: false
              })
              return function () {
                return exportModule
              }
            },
            shareConfig: {
              singleton: true,
              requiredVersion: "^19.1.1"
            }
          }
        ,
          "react-hook-form": {
            name: "react-hook-form",
            version: "7.63.0",
            scope: ["default"],
            loaded: false,
            from: "bookingApp",
            async get () {
              usedShared["react-hook-form"].loaded = true
              const {"react-hook-form": pkgDynamicImport} = importMap 
              const res = await pkgDynamicImport()
              const exportModule = {...res}
              // All npm packages pre-built by vite will be converted to esm
              Object.defineProperty(exportModule, "__esModule", {
                value: true,
                enumerable: false
              })
              return function () {
                return exportModule
              }
            },
            shareConfig: {
              singleton: false,
              requiredVersion: "^7.63.0"
            }
          }
        ,
          "react-router-dom": {
            name: "react-router-dom",
            version: "7.9.3",
            scope: ["default"],
            loaded: false,
            from: "bookingApp",
            async get () {
              usedShared["react-router-dom"].loaded = true
              const {"react-router-dom": pkgDynamicImport} = importMap 
              const res = await pkgDynamicImport()
              const exportModule = {...res}
              // All npm packages pre-built by vite will be converted to esm
              Object.defineProperty(exportModule, "__esModule", {
                value: true,
                enumerable: false
              })
              return function () {
                return exportModule
              }
            },
            shareConfig: {
              singleton: true,
              requiredVersion: "^7.9.3"
            }
          }
        ,
          "tailwind-merge": {
            name: "tailwind-merge",
            version: "3.3.1",
            scope: ["default"],
            loaded: false,
            from: "bookingApp",
            async get () {
              usedShared["tailwind-merge"].loaded = true
              const {"tailwind-merge": pkgDynamicImport} = importMap 
              const res = await pkgDynamicImport()
              const exportModule = {...res}
              // All npm packages pre-built by vite will be converted to esm
              Object.defineProperty(exportModule, "__esModule", {
                value: true,
                enumerable: false
              })
              return function () {
                return exportModule
              }
            },
            shareConfig: {
              singleton: false,
              requiredVersion: "^3.3.1"
            }
          }
        ,
          "zod": {
            name: "zod",
            version: "4.1.11",
            scope: ["default"],
            loaded: false,
            from: "bookingApp",
            async get () {
              usedShared["zod"].loaded = true
              const {"zod": pkgDynamicImport} = importMap 
              const res = await pkgDynamicImport()
              const exportModule = {...res}
              // All npm packages pre-built by vite will be converted to esm
              Object.defineProperty(exportModule, "__esModule", {
                value: true,
                enumerable: false
              })
              return function () {
                return exportModule
              }
            },
            shareConfig: {
              singleton: false,
              requiredVersion: "^4.1.11"
            }
          }
        
    }
      const usedRemotes = [
                {
                  entryGlobalName: "storeApp",
                  name: "storeApp",
                  type: "module",
                  entry: "http://localhost:3004/remoteEntry.js",
                  shareScope: "default",
                }
          
      ]
      export {
        usedShared,
        usedRemotes
      }
      