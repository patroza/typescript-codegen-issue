import ts from "typescript"

export function processNode(tc: ts.TypeChecker) {
  return (n: ts.Node) => {
    const t = tc.getTypeAtLocation(n)

    const typeDecl = tc.typeToString(
      t,
      n,
      ts.TypeFormatFlags.NoTruncation
      //ts.TypeFormatFlags.None
      //ts.TypeFormatFlags.AddUndefined |
      // | ts.TypeFormatFlags.NoTypeReduction
      //    | ts.TypeFormatFlags.MultilineObjectLiterals
         | ts.TypeFormatFlags.InTypeAlias
        //| ts.TypeFormatFlags.UseAliasDefinedOutsideCurrentScope // prevents import(*)
      //  | ts.TypeFormatFlags.UseStructuralFallback
    )
    return [
      `export interface Test ${typeDecl}`
    ]
  }
}