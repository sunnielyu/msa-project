let matrix = {
    A: {A:2, R:-2, N:0, D:0, C:-2, Q:0, E:0, G:1, H:-1, I:-1, L:-2, K:-1, M:-1, F:-4, P:1, S:1, T:1, W:-6, Y:-3, V:0},
    R: {R:6, N:0, D:-1, C:-4, Q:1, E:-1, G:-3, H:2, I:-2, L:-3, K:3, M:0, F:-4, P:0, S:0, T:-1, W:2, Y:-4, V:-2},
    N: {N:2, D:2, C:-4, Q:1, E:1, G:0, H:2, I:-2, L:-3, K:1, M:-2, F:-4, P:-1, S:1, T:0, W:-4, Y:-2, V:-2},
    D: {D:4, C:-5, Q:2, E:3, G:1, H:1, I:-2, L:-4, K:0, M:-3, F:-6, P:-1, S:0, T:0, W:-7, Y:-4, V:-2},
    C: {C:4, Q:-5, E:-5, G:-3, H:-3, I:-2, L:-6, K:-5, M:-5, F:-4, P:-3, S:0, T:-2, W:-8, Y:0, V:-2},
    Q: {Q:4, E:2, G:-1, H:3, I:-2, L:-2, K:1, M:-1, F:-5, P:0, S:-1, T:-1, W:-5, Y:-4, V:-2},
    E: {E:4, G:0, H:1, I:-2, L:-3, K:0, M:-2, F:-5, P:-1, S:0, T:0, W:-7, Y:-4, V:-2},
    G: {G:5, H:-2, I:-3, L:-4, K:-2, M:-3, F:-5, P:-1, S:1, T:0, W:-7, Y:-5, V:-1},
    H: {H:6, I:-2, L:-2, K:0, M:-2, F:-2, P:0, S:-1, T:-1, W:-3, Y:0, V:-2},
    I: {I:5, L:2, K:-2, M:2, F:1, P:-2, S:-1, T:0, W:-5, Y:-1, V:4},
    L: {L:6, K:-3, M:4, F:2, P:-3, S:-3, T:-2, W:-2, Y:-1, V:2},
    K: {K:5, M:0, F:-5, P:-1, S:0, T:0, W:-3, Y:-4, V:-2},
    M: {M:6, F:0, P:-2, S:-2, T:-1, W:-4, Y:-2, V:2},
    F: {F:9, P:-5, S:-3, T:-2, W:0, Y:7, V:-1},
    P: {P:6, S:1, T:0, W: -6, Y:-5, V:-1},
    S: {S:3, T:1, W: -2, Y:-3, V:-1},
    T: {T:3, W:-5, Y:-3, V:0},
    W: {W:17, Y:0, V:-6},
    Y: {Y:10, V:-2},
    V: {V:4}
};
function score(x, y) {
    let ans;
    try {
        ans = typeof matrix[x][y] === 'number' ? matrix[x][y] : matrix[y][x];
    } catch(e) {
        console.log(x, y);
    }
    return ans;
}

module.exports = score;