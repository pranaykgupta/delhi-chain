const Blockchain = require('./index');
const Block = require('./block');

describe('Blockchain', () => {
    let bc,bc2;
    beforeEach( () => {
        bc = new Blockchain();
        bc2 = new Blockchain();
    });

    it('set the first block as genesis block', () => {
        expect(bc.chain[0]).toEqual(Block.genesis());
    });

    it('set given data to new block data', () => {
        const data = 'foo';
        bc.addBlock(data);
        expect(bc.chain[bc.chain.length -1].data).toEqual(data);
    });

    it('validates the correct chain', () => {
        const data = 'foo';
        bc2.addBlock(data);
        expect(bc.isValidChain(bc2.chain)).toBe(true);
    });

    it('invalidate chain with corrupt genesis data', () => {
        bc2.chain[0].data = 'bad data';
        expect(bc.isValidChain(bc2.chain)).toBe(false);
    });

    it('invalidate chain with corrupt chain', ()=> {
        bc2.addBlock('foo');
        bc2.chain[1].data = 'not foo';
        expect(bc.isValidChain(bc2.chain)).toBe(false);
    });

    it('replaces a valid new chain', () =>{
        bc2.addBlock('foo');
        bc.replaceChain(bc2.chain);
        expect(bc.chain).toEqual(bc2.chain);
    });

    it('do not replace with a chain of lesser length', () => {
        bc.addBlock('goo');
        bc.replaceChain(bc2.chain);
        expect(bc.chain).not.toEqual(bc2.chain);
    });
});