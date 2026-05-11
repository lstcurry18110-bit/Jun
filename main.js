
class ExerciseCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.addEventListeners();
  }

  static get observedAttributes() {
    return ['name', 'sets', 'reps', 'image'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.render();
    this.addEventListeners();
  }

  render() {
    const name = this.getAttribute('name') || '운동';
    const sets = parseInt(this.getAttribute('sets'), 10) || 0;
    const reps = this.getAttribute('reps') || 'N/A';
    const imageUrl = this.getAttribute('image') || '';

    let setsHtml = '';
    for (let i = 1; i <= sets; i++) {
      setsHtml += `
        <label class="set-label">
          ${i}세트 <input type="checkbox" class="set-checkbox">
        </label>
      `;
    }

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          background-color: #ffffff;
          border-radius: 12px;
          padding: 25px;
          box-shadow: 0 8px 25px rgba(0,0,0,0.08);
          transition: all 0.3s ease;
          border: 1px solid #e0e0e0;
          position: relative; /* 툴팁 위치의 기준점 */
        }
        :host(.completed) {
          border-left: 5px solid #28a745;
          background-color: #f8f9fa;
        }
        h3 {
          margin: 0 0 10px;
          color: #212529;
          font-size: 1.5em;
          font-weight: 700;
          display: flex;
          align-items: center;
          cursor: help; /* 마우스 커서를 도움말로 변경 */
        }
        p { margin: 0 0 15px; color: #6c757d; font-size: 1.1em; }
        .master-checkbox { margin-right: 15px; width: 20px; height: 20px; accent-color: #007bff; cursor: pointer; }
        .exercise-name.strikethrough { text-decoration: line-through; color: #adb5bd; }
        .sets-container { display: flex; flex-direction: column; gap: 10px; margin-top: 15px; }
        .set-label { color: #495057; display: flex; align-items: center; justify-content: space-between; font-size: 1.05em; padding: 8px; background: #f8f9fa; border-radius: 6px; }
        .set-checkbox { width: 18px; height: 18px; accent-color: #28a745; cursor: pointer; }
        
        /* 이미지 툴팁 스타일 */
        .image-tooltip {
          visibility: hidden;
          opacity: 0;
          width: 250px;
          background-color: #fff;
          border: 1px solid #ddd;
          box-shadow: 0 5px 15px rgba(0,0,0,0.1);
          border-radius: 10px;
          padding: 10px;
          position: absolute;
          z-index: 10;
          bottom: 100%;
          left: 50%;
          transform: translateX(-50%);
          transition: opacity 0.3s, visibility 0.3s;
        }
        .image-tooltip img {
          width: 100%;
          height: auto;
          border-radius: 6px;
        }
        /* h3에 마우스를 올렸을 때, 바로 뒤에 오는 .image-tooltip을 보여줌 */
        h3:hover + .image-tooltip {
          visibility: visible;
          opacity: 1;
        }
      </style>
      <div>
        <h3>
          <input type="checkbox" class="master-checkbox">
          <span class="exercise-name">${name}</span>
        </h3>
        ${imageUrl ? `<div class="image-tooltip"><img src="${imageUrl}" alt="${name} 시범"></div>` : ''}
        <p>반복: ${reps}</p>
        <div class="sets-container">
          ${setsHtml}
        </div>
      </div>
    `;
  }

  addEventListeners() {
    const masterCheckbox = this.shadowRoot.querySelector('.master-checkbox');
    const exerciseName = this.shadowRoot.querySelector('.exercise-name');
    const setCheckboxes = this.shadowRoot.querySelectorAll('.set-checkbox');

    masterCheckbox.addEventListener('change', () => {
      const isChecked = masterCheckbox.checked;
      exerciseName.classList.toggle('strikethrough', isChecked);
      setCheckboxes.forEach(cb => cb.checked = isChecked);
      this.classList.toggle('completed', isChecked);
    });

    setCheckboxes.forEach(checkbox => {
      checkbox.addEventListener('change', () => {
        const allChecked = Array.from(setCheckboxes).every(cb => cb.checked);
        masterCheckbox.checked = allChecked;
        exerciseName.classList.toggle('strikethrough', allChecked);
        this.classList.toggle('completed', allChecked);
      });
    });
  }
}
customElements.define('exercise-card', ExerciseCard);

const workouts = {
    upper1: [
        [
            { name: '벤치 프레스', sets: 4, reps: '5-8회', image: 'https://static.strengthlevel.com/images/illustrations/bench-press-1000x1000.jpg' },
            { name: '바벨 로우', sets: 4, reps: '5-8회', image: 'https://static.strengthlevel.com/images/illustrations/bent-over-row-1000x1000.jpg' },
            { name: '인클라인 덤벨 프레스', sets: 3, reps: '8-12회', image: 'https://static.strengthlevel.com/images/illustrations/incline-dumbbell-press-1000x1000.jpg' },
            { name: '랫 풀다운', sets: 3, reps: '8-12회', image: 'https://static.strengthlevel.com/images/illustrations/lat-pulldown-1000x1000.jpg' },
            { name: '케이블 플라이', sets: 3, reps: '12-15회', image: 'https://static.strengthlevel.com/images/illustrations/cable-fly-1000x1000.jpg' },
            { name: '페이스 풀', sets: 3, reps: '15-20회', image: 'https://static.strengthlevel.com/images/illustrations/face-pull-1000x1000.jpg' },
        ],
        [
            { name: '인클라인 벤치 프레스', sets: 4, reps: '8-12회', image: 'https://static.strengthlevel.com/images/illustrations/incline-bench-press-1000x1000.jpg' },
            { name: 'T-바 로우', sets: 4, reps: '8-12회', image: 'https://static.strengthlevel.com/images/illustrations/t-bar-row-1000x1000.jpg' },
            { name: '딥스', sets: 3, reps: '10-15회', image: 'https://static.strengthlevel.com/images/illustrations/dips-1000x1000.jpg' },
            { name: '시티드 케이블 로우', sets: 3, reps: '10-15회', image: 'https://static.strengthlevel.com/images/illustrations/cable-row-1000x1000.jpg' },
            { name: '푸쉬업', sets: 3, reps: '실패지점까지', image: 'https://static.strengthlevel.com/images/illustrations/push-up-1000x1000.jpg' },
            { name: '덤벨 풀오버', sets: 3, reps: '12-15회', image: 'https://static.strengthlevel.com/images/illustrations/dumbbell-pullover-1000x1000.jpg' },
        ]
    ],
    lower1: [
        [
            { name: '스쿼트', sets: 4, reps: '5-8회', image: 'https://static.strengthlevel.com/images/illustrations/squat-1000x1000.jpg' },
            { name: '루마니안 데드리프트', sets: 4, reps: '8-10회', image: 'https://static.strengthlevel.com/images/illustrations/romanian-deadlift-1000x1000.jpg' },
            { name: '레그 프레스', sets: 3, reps: '10-15회', image: 'https://static.strengthlevel.com/images/illustrations/leg-press-1000x1000.jpg' },
            { name: '라잉 레그 컬', sets: 3, reps: '12-15회', image: 'https://static.strengthlevel.com/images/illustrations/lying-leg-curl-1000x1000.jpg' },
            { name: '스탠딩 카프 레이즈', sets: 4, reps: '10-15회', image: 'https://static.strengthlevel.com/images/illustrations/calf-raise-1000x1000.jpg' },
        ],
        [
            { name: '레그 프레스', sets: 4, reps: '12-15회', image: 'https://static.strengthlevel.com/images/illustrations/leg-press-1000x1000.jpg' },
            { name: '프론트 스쿼트', sets: 4, reps: '8-12회', image: 'https://static.strengthlevel.com/images/illustrations/front-squat-1000x1000.jpg' },
            { name: '덤벨 런지', sets: 3, reps: '다리당 10-12회', image: 'https://static.strengthlevel.com/images/illustrations/dumbbell-lunge-1000x1000.jpg' },
            { name: '레그 익스텐션', sets: 3, reps: '15-20회', image: 'https://static.strengthlevel.com/images/illustrations/leg-extension-1000x1000.jpg' },
            { name: '시티드 카프 레이즈', sets: 4, reps: '15-20회', image: 'https://static.strengthlevel.com/images/illustrations/seated-calf-raise-1000x1000.jpg' },
        ]
    ],
    upper2: [
        [
            { name: '오버헤드 프레스', sets: 4, reps: '5-8회', image: 'https://static.strengthlevel.com/images/illustrations/overhead-press-1000x1000.jpg' },
            { name: '중량 친업', sets: 4, reps: '6-10회', image: 'https://static.strengthlevel.com/images/illustrations/chin-up-1000x1000.jpg' },
            { name: '덤벨 숄더 프레스', sets: 3, reps: '8-12회', image: 'https://static.strengthlevel.com/images/illustrations/dumbbell-shoulder-press-1000x1000.jpg' },
            { name: '바벨 컬', sets: 3, reps: '8-12회', image: 'https://static.strengthlevel.com/images/illustrations/barbell-curl-1000x1000.jpg' },
            { name: '스컬 크러셔', sets: 3, reps: '8-12회', image: 'https://static.strengthlevel.com/images/illustrations/skullcrusher-1000x1000.jpg' },
            { name: '래터럴 레이즈', sets: 4, reps: '12-15회', image: 'https://static.strengthlevel.com/images/illustrations/dumbbell-lateral-raise-1000x1000.jpg' },
        ],
        [
            { name: '아놀드 프레스', sets: 4, reps: '10-12회', image: 'https://static.strengthlevel.com/images/illustrations/arnold-press-1000x1000.jpg' },
            { name: '트라이셉스 푸시다운', sets: 4, reps: '12-15회', image: 'https://static.strengthlevel.com/images/illustrations/tricep-pushdown-1000x1000.jpg' },
            { name: '덤벨 컬', sets: 4, reps: '12-15회', image: 'https://static.strengthlevel.com/images/illustrations/dumbbell-curl-1000x1000.jpg' },
            { name: '업라이트 로우', sets: 3, reps: '12-15회', image: 'https://static.strengthlevel.com/images/illustrations/upright-row-1000x1000.jpg' },
            { name: '해머 컬', sets: 3, reps: '12-15회', image: 'https://static.strengthlevel.com/images/illustrations/hammer-curl-1000x1000.jpg' },
            { name: '오버헤드 트라이셉스 익스텐션', sets: 3, reps: '12-15회', image: 'https://static.strengthlevel.com/images/illustrations/dumbbell-overhead-tricep-extension-1000x1000.jpg' },
        ]
    ],
    lower2: [
        [
            { name: '컨벤셔널 데드리프트', sets: 4, reps: '3-5회', image: 'https://static.strengthlevel.com/images/illustrations/deadlift-1000x1000.jpg' },
            { name: '힙 쓰러스트', sets: 4, reps: '8-12회', image: 'https://static.strengthlevel.com/images/illustrations/hip-thrust-1000x1000.jpg' },
            { name: '굿모닝', sets: 3, reps: '10-15회', image: 'https://static.strengthlevel.com/images/illustrations/good-morning-1000x1000.jpg' },
            { name: '백 익스텐션', sets: 3, reps: '15-20회', image: 'https://static.strengthlevel.com/images/illustrations/back-extension-1000x1000.jpg' },
            { name: '행잉 레그 레이즈', sets: 3, reps: '실패지점까지', image: 'https://static.strengthlevel.com/images/illustrations/hanging-leg-raise-1000x1000.jpg' },
        ],
        [
            { name: '핵 스쿼트', sets: 4, reps: '8-12회', image: 'https://static.strengthlevel.com/images/illustrations/hack-squat-1000x1000.jpg' },
            { name: '불가리안 스플릿 스쿼트', sets: 3, reps: '다리당 10-12회', image: 'https://static.strengthlevel.com/images/illustrations/bulgarian-split-squat-1000x1000.jpg' },
            { name: '스티프 레그 데드리프트', sets: 4, reps: '8-12회', image: 'https://static.strengthlevel.com/images/illustrations/stiff-leg-deadlift-1000x1000.jpg' },
            { name: '플랭크', sets: 3, reps: '최대 시간', image: 'https://static.strengthlevel.com/images/illustrations/plank-1000x1000.jpg' },
            { name: 'Ab 롤아웃', sets: 3, reps: '10-15회', image: 'https://static.strengthlevel.com/images/illustrations/ab-wheel-rollout-1000x1000.jpg' },
        ]
    ]
};

const workoutDescriptions = {
    upper1: '<strong>Day 1: 가슴 & 등</strong><br>주로 미는 동작(Push)과 당기는 동작(Pull)을 통해 상체 전반의 근력과 크기를 키우는 데 집중합니다.',
    lower1: '<strong>Day 2: 하체</strong><br>스쿼트, 데드리프트와 같은 다관절 운동을 중심으로 대퇴사두, 햄스트링, 둔근 등 하체 주요 근육을 종합적으로 발달시킵니다.',
    upper2: '<strong>Day 3: 어깨 & 팔</strong><br>어깨의 볼륨감을 키우고 팔 근육(이두, 삼두)의 데피니션을 높여 더욱 입체적인 상체를 만듭니다.',
    lower2: '<strong>Day 4: 후면 사슬 & 코어</strong><br>등 하부, 둔근, 햄스트링으로 이어지는 후면 사슬의 근력과 코어 안정성을 강화하여 전신 협응력을 높이고 부상을 예방합니다.'
};

document.addEventListener('DOMContentLoaded', () => {
    const workoutDisplay = document.getElementById('workout-display');
    const workoutDescription = document.getElementById('workout-description');
    const dayButtons = document.querySelectorAll('.day-btn');
    const changeWorkoutBtn = document.getElementById('change-workout');

    let currentDay = 'upper1';
    let workoutVariations = { upper1: 0, lower1: 0, upper2: 0, lower2: 0 };

    function showWorkout(day) {
        currentDay = day;
        workoutDisplay.innerHTML = '';
        workoutDescription.innerHTML = workoutDescriptions[day];
        dayButtons.forEach(btn => btn.classList.remove('active'));
        document.getElementById(day).classList.add('active');

        const variationIndex = workoutVariations[day];
        const selectedWorkout = workouts[day][variationIndex];
        
        selectedWorkout.forEach(exercise => {
            const exerciseCard = document.createElement('exercise-card');
            exerciseCard.setAttribute('name', exercise.name);
            exerciseCard.setAttribute('sets', exercise.sets);
            exerciseCard.setAttribute('reps', exercise.reps);
            exerciseCard.setAttribute('image', exercise.image);
            workoutDisplay.appendChild(exerciseCard);
        });
    }

    changeWorkoutBtn.addEventListener('click', () => {
        const variationsForDay = workouts[currentDay].length;
        workoutVariations[currentDay] = (workoutVariations[currentDay] + 1) % variationsForDay;
        showWorkout(currentDay);
    });

    dayButtons.forEach(button => {
        button.addEventListener('click', () => {
            showWorkout(button.id);
        });
    });

    showWorkout('upper1');
});
