function cosineSimilarity(word1, word2) {
  const words = [word1, word2];
  const vector = [];

  // 단어 벡터 생성
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    const count = {};

    for (let j = 0; j < word.length; j++) {
      const char = word.charAt(j);
      if (count[char]) {
        count[char]++;
      } else {
        count[char] = 1;
      }
    }

    vector.push(count);
  }

  // 코사인 유사도 계산
  const dotProduct = Object.keys(vector[0]).reduce((sum, char) => {
    if (vector[1][char]) {
      return sum + vector[0][char] * vector[1][char];
    } else {
      return sum;
    }
  }, 0);

  const norm1 = Math.sqrt(
    Object.values(vector[0]).reduce((sum, count) => {
      return sum + count * count;
    }, 0)
  );

  const norm2 = Math.sqrt(
    Object.values(vector[1]).reduce((sum, count) => {
      return sum + count * count;
    }, 0)
  );

  const cosineSimilarity = dotProduct / (norm1 * norm2);

  return cosineSimilarity;
}

function generateMatchups(teams) {
  const matchups = [];
  const usedIndices = new Set();

  for (let i = 0; i < teams.length; i++) {
    if (usedIndices.has(i)) continue;

    let bestMatchIndex = -1;
    let minCosineSimilarity = 1;

    for (let j = 0; j < teams.length; j++) {
      if (i === j || usedIndices.has(j)) continue;

      const similarity = cosineSimilarity(teams[i], teams[j]);

      if (similarity < minCosineSimilarity) {
        minCosineSimilarity = similarity;
        bestMatchIndex = j;
      }
    }

    if (bestMatchIndex !== -1) {
      matchups.push(teams[i], teams[bestMatchIndex]);
      usedIndices.add(i);
      usedIndices.add(bestMatchIndex);
    }
  }

  return matchups;
}

let words1 = [
  "김포 골드라이온",
  "풍무 존프랭클",
  "김포 골든라이언",
  "풍무 존플랭클",
  "김포 골드라이언",
  "풍무 존플랭크",
  "김포 존프랭클",
  "김포 골든라이온",
  "김포 조플랭크",
  "김포 골드라이온",
];

let words2 = [
  "김포 골드라이온",
  "골드 라이온김포",
  "김포 골드라이언",
  "김포 골든라이온",
  "김포 골든라이언",
  "김포 존프랭클",
  "김포 조플랭크",
  "풍무 존플랭클",
  "풍무 존프랭클",
  "풍무 존플랭크",
  "마포 어반주짓수",
  "성북 어반주짓수",
  "혜화 어반주짓수",
];

let words3 = [
  "김포골드라이온",
  "골드라이온김포",
  "김포골드라이언",
  "김포골든라이온",
  "김포골든라이언",
  "김포존프랭클",
  "김포조플랭크",
  "풍무존플랭클",
  "풍무존프랭클",
  "풍무존플랭크",
  "마포어반주짓수",
  "성북어반주짓수",
  "혜화어반주짓수",
];

let matchups = generateMatchups(words3);

console.log(matchups);
