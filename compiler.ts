import ts from "typescript"

export function processNode(tc: ts.TypeChecker) {
  return (n: ts.Node) => {
      const modelName = (n as any).name?.escapedText
      if (!modelName) { return }
      console.log("processing", modelName)

      const t = tc.getTypeAtLocation(n)

      const result = { parsed: "" }
      t.getProperties().forEach((c) => {
        const method = c.name
        if (method === "parsed") {
          const tt = tc.getTypeOfSymbolAtLocation(c, n)
          const typeDecl = tc.typeToString(
            tt,
            n,
            ts.TypeFormatFlags.NoTruncation
            //ts.TypeFormatFlags.None
            | ts.TypeFormatFlags.AddUndefined
             | ts.TypeFormatFlags.NoTypeReduction
               // | ts.TypeFormatFlags.MultilineObjectLiterals
               | ts.TypeFormatFlags.InTypeAlias
              //| ts.TypeFormatFlags.UseAliasDefinedOutsideCurrentScope // prevents import(*)
              | ts.TypeFormatFlags.UseStructuralFallback
          )
          const str = typeDecl
          result[method] = str
        }
      })

      if (!result.parsed) {
        return
      }

      return [
        `export interface ${modelName.replace("Constructor", "")} ${result.parsed}`
      ]
  }
}