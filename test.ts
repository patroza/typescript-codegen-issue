export class Test {
  static readonly parsed: {
    failedTest: string | null
    failedTest2: string | undefined
    succeededTest: string | number
    succeedTest2: null
    succeedTest3: undefined
  } = { failedTest: null, failedTest2: undefined, succeededTest: 1, succeedTest2: null, succeedTest3: undefined }
}



export type TestConstructor = typeof Test
