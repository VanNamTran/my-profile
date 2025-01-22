//----------------------------------- D I C E -------------------------------//

// Danh sách ảnh tương ứng với các mặt xúc xắc
const diceFaces = [
      "images/bau.jpeg",  // Front
      "images/cua.jpeg",  // Back
      "images/tom.jpeg",  // Right
      "images/ca.jpeg",   // Left
      "images/ga.jpeg",   // Top
      "images/nai.jpeg"   // Bottom
    ];
    
    
    const faceAngles = [
      { x: 0, y: 0 },       // Front (cua)
      { x: 0, y: 180 },     // Back (tôm)
      { x: 0, y: -90 },     // Right (ca)
      { x: 0, y: 90 },      // Left (ga)
      { x: -90, y: 0 },     // Top (nai)
      { x: 90, y: 0 }       // Bottom (bau)
    ];
    
    
    function rollDice() {
      const diceElements = document.querySelectorAll(".dice");
      const rollButton = document.querySelector("#roll-btn");
      rollButton.disabled = true;
      const diceResults = []; 
      let completedDice = 0;  // Biến đếm số xúc xắc đã quay xong
    
      diceElements.forEach(dice => {
        // Xác định mặt kết quả ngẫu nhiên
        const resultFace = Math.floor(Math.random() * 6); 
        diceResults.push(resultFace);
        console.log(resultFace); 
    
        const finalX = faceAngles[resultFace].x;
        const finalY = faceAngles[resultFace].y;
        const extraSpins = 4; 
        const targetX = extraSpins * 360 + finalX;
        const targetY = extraSpins * 360 + finalY;
    
        // Tạo hiệu ứng quay nhanh rồi chậm dần
        dice.style.transition = "transform 3s cubic-bezier(0.25, 1, 0.5, 1)";
        dice.style.transform = `rotateX(${targetX}deg) rotateY(${targetY}deg)`; 
    
        // Cập nhật lại mặt của xúc xắc sau khi quay
        dice.addEventListener('transitionend', () => {
          completedDice++;  // Tăng biến đếm mỗi khi một xúc xắc hoàn thành
          dice.style.transition = "transform 0s"; // Tắt transition khi đã dừng lại
          dice.style.transform = `rotateX(${finalX}deg) rotateY(${finalY}deg)`;
    
          // Kiểm tra xem tất cả các xúc xắc đã quay xong chưa
          if (completedDice === diceElements.length) {
            rollButton.disabled = false; // Kích hoạt lại nút quay
            calculateResult(diceResults); // Tính kết quả sau khi tất cả đã hoàn tất
          }
        }, { once: true });  // Chỉ xử lý sự kiện này một lần
      });
    }
    
    
    // Gắn sự kiện cho nút tung xúc xắc
    document.getElementById("roll-btn").addEventListener("click", rollDice);
    
    // Hàm đặt hình ảnh cho các mặt xúc xắc
    function setDiceFaces(diceElement) {
      const faces = ["front", "back", "right", "left", "top", "bottom"];
      faces.forEach((face, index) => {
        const faceElement = document.createElement("div");
        faceElement.className = face;
        faceElement.style.backgroundImage = `url(${diceFaces[index]})`;  // Gán hình ảnh cho mỗi mặt
        diceElement.appendChild(faceElement);
        
      });
    }
    // Khởi tạo xúc xắc
    document.querySelectorAll(".dice").forEach(setDiceFaces);
    
    
    // --------------------------------- B E T S  Balance -----------------------------------//
    
    const bets = {
      ga: 0,
      cua: 0,
      tom: 0,
      ca: 0,
      nai: 0,
      bau: 0,
    };
    let userCoins = 100;
    
    // Hàm cập nhật hiển thị số xu
    function updateCoinDisplay() {
      const coinDisplay = document.getElementById("coin-count");
      if (coinDisplay) {
        coinDisplay.textContent = userCoins;
      }
    }
    
    // Hàm điều chỉnh cược
    function updateBet(option, delta) {
      const currentBet = bets[option];
      const newBet = currentBet + delta;
    
      // Kiểm tra điều kiện cược (không âm và không vượt quá số xu hiện tại)
      if (newBet >= 0 && userCoins >= delta) {
        bets[option] = newBet;
        userCoins -= delta;
    
        // Cập nhật giao diện
        const betElement = document.getElementById(option + "-bet");
        if (betElement) {
          betElement.innerText = bets[option];
        }
        updateCoinDisplay();
        console.log(bets); // Kiểm tra trạng thái cược
      } else if (delta > 0) {
        alert("Không đủ xu để cược thêm!");
      }
    }
    
    // Hàm reset cược
    function resetBet() {
      for (let option in bets) {
        userCoins += bets[option]; // Hoàn lại số xu đã cược
        bets[option] = 0; // Đặt lại tiền cược
        const betElement = document.getElementById(option + "-bet");
        if (betElement) {
          betElement.innerText = 0; // Cập nhật giao diện
        }
      }
      updateCoinDisplay(); // Cập nhật số xu
      console.log("Bets sau khi reset:", bets);
    }
    
    
    
     function calculateResult(diceResults) {
      const faceNames = ["bau", "cua", "tom", "ca", "ga", "nai"];
      
      // Đếm số lần xuất hiện của mỗi mặt
      const resultCount = {
        ga: 0,
        cua: 0,
        tom: 0,
        ca: 0,
        nai: 0,
        bau: 0
      };
      
      // Cập nhật số lần xuất hiện dựa trên kết quả tung
      diceResults.forEach(result => {
        const faceName = faceNames[result];
        resultCount[faceName]++;
      });
    
      let totalReceived = 0; 
      let totalBet = 0; 
    
      for (const face in bets) {
        if (bets[face] > 0) {
          totalBet += bets[face]; 
    
          if (resultCount[face] > 0) {
            const winAmount = bets[face] * resultCount[face];
            const receivedAmount = bets[face] + winAmount; 
            totalReceived += receivedAmount;
            const messageContainer = document.getElementById(face + "-message-container");
            createBubbleMessage(messageContainer, `+${receivedAmount}`, 'win');
            const betElement = document.getElementById(face + "-bet");
            createFlyingCoin(betElement);
          } else {
            const messageContainer = document.getElementById(face + "-message-container");
            createBubbleMessage(messageContainer, `-${bets[face]}`, 'loss');
          }
        }
      }
    
      const totalLoss = totalBet - totalReceived; // Tổng lỗ = Tổng cược - Tổng nhận lại
      userCoins += totalReceived - totalBet; // Cập nhật số xu của người chơi
    
      // Cập nhật giao diện
      updateCoinDisplay();
      resetBet();
    }
    
    
    
    function createBubbleMessage(element, message, type) {
      const bubble = document.createElement("div");
      bubble.classList.add("bubble-message");
      
      if (type === 'loss') {
        bubble.classList.add("loss");
      }
      bubble.textContent = message;
      element.appendChild(bubble);
      setTimeout(() => {
        bubble.remove();
      }, 1500); 
    }
    
    
    function createFlyingCoin(betElement) {
      const coin = document.createElement("div");
      coin.classList.add("coin-flying");
      const coinBag = document.getElementById("coin-count"); 
      const coinBagRect = coinBag.getBoundingClientRect();
      const rect = betElement.getBoundingClientRect();
      const moveX = coinBagRect.left - rect.left;
      const moveY = coinBagRect.top - rect.top;
    
      coin.style.setProperty('--move-x', `${moveX}px`);
      coin.style.setProperty('--move-y', `${moveY}px`);
    
    
      coin.style.left = `${rect.left}px`;
      coin.style.top = `${rect.top}px`;
    
      document.body.appendChild(coin);
    
      coin.addEventListener('animationend', () => {
        coin.remove();
      });
    }
    