const Block = require('./block');

describe('Block', () => {
    let data,lastBlock,block;
    beforeEach( () => {
        data = 'bar';
        lastBlock = Block.genesis();
        block = Block.mineBlock(lastBlock,data);
    });
    it('check that `data` is set as the input one', () => {
        expect(block.data).toEqual(data);
    });
    it('check that `lastHash` is equal to the hash of the last block', () => {
        expect(block.lastHash).toEqual(lastBlock.hash);
    });
});