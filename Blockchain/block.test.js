const Block = require('./block');
const { DIFFICULTY } = require('../config');

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

    it('if the generated hash matches the required diffuculty', () => {
        expect(block.hash.substring(0,block.difficulty)).toEqual('0'.repeat(block.difficulty));
    });

    it('check if difficulty decreases on slower mine rate', () => {
        expect(Block.adjustDifficulty(block, block.timestamp + 36000)).toEqual(block.difficulty -1);
    });

    it('check if difficulty increases for high mine rate', () => {
        expect(Block.adjustDifficulty(block, block.timestamp + 1)).toEqual(block.difficulty + 1);
    });

});