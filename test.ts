export class Test {
  readonly parsed: {
    failedTest: string | null
    failedTest2: string | undefined
    succeededTest: string | number
    succeededTest2: null
    succeededTest3: undefined
  } = {
    failedTest: "hi",
    failedTest2: "hi",
    succeededTest: "hi",
    succeededTest2: null,
    succeededTest3: undefined,
  }
}
