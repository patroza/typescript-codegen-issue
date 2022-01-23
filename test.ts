export class Test {
  static parsed: {
    failedTest: string | null
    failedTest2: string | undefined
    succeededTest: string | number
    succeedTest2: null
    succeedTest3: undefined
  }
}

export type TestConstructor = typeof Test
