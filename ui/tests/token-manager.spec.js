import TokenManager from "../src/components/token-manager"

const inputTokens = [
    [0, 1, "A"],
    [3, 5, "big"],
    [7, 9, "box"],
    [11, 12, "of"],
    [14, 19, "sweets"],
    [20, 26, "waiting"],
    [28, 29, "to"],
    [31, 32, "be"],
    [33, 38, "eaten"],
];

test("Initialize with input tokens", () => {
  let tmgr = new TokenManager([[0, 4, "hello"], [6, 10, "world"]]);
  expect(tmgr.tokens).toEqual([
      {type: "token", start: 0, end: 4, text: "hello"},
      {type: "token", start: 6, end: 10, text: "world"},
  ]);
});


test("addNewBlock: creates new token block using start and end", () => {
  let tm = new TokenManager(inputTokens);
  tm.addNewBlock(0, 7);

  let block = tm.tokens[0]
  expect(block.type).toBe('token-block');
  expect(block.label).toBe('Unlabelled');
  expect(block.tokens).toBeInstanceOf(Array);
  expect(block.tokens.length).toBe(3);
  expect(tm.tokens.length).toBe(inputTokens.length - 2);
});

test('removeBlock: removes a token block and puts the tokens back', () => {
  let tm = new TokenManager(inputTokens);
  tm.addNewBlock(0, 7);
  expect(tm.tokens[0].type).toBe('token-block');
  expect(tm.tokens.length).toBe(inputTokens.length - 2);
  tm.removeBlock(0);
  expect(tm.tokens[0].type).toBe('token');
  expect(tm.tokens.length).toBe(inputTokens.length);
  expect(tm.tokens[0].start).toBe(0)
  expect(tm.tokens[1].start).toBe(3)
  expect(tm.tokens[2].start).toBe(7)
})