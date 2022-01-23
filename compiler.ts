import ts from "typescript"

export function processNode(tc: ts.TypeChecker) {
  return (n: ts.Node) => {
    if (/*ts.isClassDeclaration(n) || ts.isTypeAliasDeclaration(n)*/ true) {
      const modelName = (n as any).name?.escapedText

      if (!modelName?.endsWith("Constructor")) {
        return
      }

      const t = tc.getTypeAtLocation(n)

      const result = { encoded: "", parsed: "" }
      t.getProperties().forEach((c) => {
        const method = c.name
        if (method === "encoded" || method === "parsed") {
          const tt = tc.getTypeOfSymbolAtLocation(c, n)
          const typeDecl = tc.typeToString(
            tt,
            n,
            ts.TypeFormatFlags.NoTruncation
            //ts.TypeFormatFlags.None
            //ts.TypeFormatFlags.AddUndefined |
            // | ts.TypeFormatFlags.NoTypeReduction
            //    | ts.TypeFormatFlags.MultilineObjectLiterals
            //   | ts.TypeFormatFlags.InTypeAlias
              | ts.TypeFormatFlags.UseAliasDefinedOutsideCurrentScope // prevents import(*)
            //  | ts.TypeFormatFlags.UseStructuralFallback
          )
          const str = typeDecl
          result[method] = str
        }
      })

      if (!result.parsed) {
        throw new Error("No parsed result")
      }

      return [
        `export interface ${modelName.replace("Constructor", "")} ${result.parsed}`
      ]
    }
  }
}