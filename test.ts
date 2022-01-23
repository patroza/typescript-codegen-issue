type Abc = {
  failedTest: string | null
  failedTest2: string | undefined
  succeededTest: string | number
  succeededTest2: null
  succeededTest3: undefined
}
const abc: Abc = {
  failedTest: "hi",
  failedTest2: "hi",
  succeededTest: "hi",
  succeededTest2: null,
  succeededTest3: undefined,
}

export class TestFail {
  readonly parsed: Abc = abc
}
export class TestFail2 {
  readonly parsed: typeof abc = abc
}

export class TestWorks {
  readonly parsed: {
    failedTest: string | null
    failedTest2: string | undefined
    succeededTest: string | number
    succeededTest2: null
    succeededTest3: undefined
  } = abc
}
