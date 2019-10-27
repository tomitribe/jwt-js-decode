beforeAll(function () {
    jest.mock('pako', () => {
        return jest.requireActual('pako');
    });
});
