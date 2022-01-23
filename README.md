# Bug showcase

Unions with `null` or `undefined` disappear, once there's a `typeof` in the mix.

`TestFail` and `TestFail2` should be the same result as `TestWorks`:

```
processing TestFail
[
  'export interface TestFail { failedTest: string; failedTest2: string; succeededTest: string | number; succeededTest2: null; succeededTest3: undefined; }'
]
processing TestFail2
[
  'export interface TestFail2 { failedTest: string; failedTest2: string; succeededTest: string | number; succeededTest2: null; succeededTest3: undefined; }'
]
processing TestWorks
[
  'export interface TestWorks { failedTest: string | null; failedTest2: string | undefined; succeededTest: string | number; succeededTest2: null; succeededTest3: undefined; }'
]
```

## How to run

- `yarn`
- `yarn start`
