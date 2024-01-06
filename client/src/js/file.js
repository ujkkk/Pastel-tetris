export function saveScoreToFile(score) {
    // score를 문자열로 변환하여 Local Storage에 저장
    localStorage.setItem('score', JSON.stringify(score));
}


export function readScoreFromFile() {
    // Local Storage에서 score를 불러와서 파싱
    const savedScore = localStorage.getItem('score');
    if (savedScore) {
        return JSON.parse(savedScore);
    }
    return 0;
}
