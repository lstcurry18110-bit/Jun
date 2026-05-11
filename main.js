
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
    return ['name', 'sets', 'reps'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.render();
    this.addEventListeners();
  }

  render() {
    const name = this.getAttribute('name') || '운동';
    const sets = parseInt(this.getAttribute('sets'), 10) || 0;
    const reps = this.getAttribute('reps') || 'N/A';

    let setsHtml = '';
    for (let i = 1; i <= sets; i++) {
      setsHtml += `
        <label class="set-label">
          ${i}세트: <input type="checkbox" class="set-checkbox">
        </label>
      `;
    }

    this.shadowRoot.innerHTML = `
      <style>
        :host { display: block; background-color: #2c2c2c; border-radius: 12px; padding: 25px; box-shadow: 0 8px 25px rgba(0,0,0,0.4); transition: all 0.3s ease; border-left: 5px solid transparent;}
        h3 { margin: 0 0 15px; color: #fff; font-size: 1.7em; font-weight: 600; display: flex; align-items: center; }
        p { margin: 0 0 20px; color: #c0c0c0; font-size: 1.1em; }
        .master-checkbox { margin-right: 15px; width: 22px; height: 22px; cursor: pointer; }
        .exercise-name.strikethrough { text-decoration: line-through; color: #777; }
        .sets-container { display: flex; flex-direction: column; gap: 12px; margin-top: 15px; }
        .set-label { color: #ddd; display: flex; align-items: center; font-size: 1.1em; }
        .set-checkbox { margin-left: auto; width: 20px; height: 20px; cursor: pointer; }
        :host(.completed) { border-left-color: #28a745; background-color: #333; }
      </style>
      <div>
        <h3>
          <input type="checkbox" class="master-checkbox">
          <span class="exercise-name">${name}</span>
        </h3>
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
            { name: '벤치 프레스', sets: 4, reps: '6-10회' },
            { name: '풀업', sets: 4, reps: '가능한 많이' },
            { name: '인클라인 덤벨 프레스', sets: 3, reps: '8-12회' },
            { name: '바벨 로우', sets: 3, reps: '8-12회' },
            { name: '래터럴 레이즈', sets: 4, reps: '12-15회' },
        ],
        [
            { name: '오버헤드 프레스', sets: 4, reps: '6-10회' },
            { name: '딥스', sets: 4, reps: '8-12회' },
            { name: '케이블 로우', sets: 3, reps: '10-15회' },
            { name: '덤벨 플라이', sets: 3, reps: '12-15회' },
            { name: '페이스 풀', sets: 4, reps: '15-20회' },
        ]
    ],
    lower1: [
        [
            { name: '스쿼트', sets: 4, reps: '6-10회' },
            { name: '루마니안 데드리프트', sets: 3, reps: '8-12회' },
            { name: '레그 프레스', sets: 3, reps: '10-15회' },
            { name: '카프 레이즈', sets: 5, reps: '15-20회' },
        ],
        [
            { name: '데드리프트', sets: 4, reps: '4-6회' },
            { name: '레그 컬', sets: 3, reps: '10-15회' },
            { name: '고블릿 스쿼트', sets: 3, reps: '12-15회' },
            { name: '시티드 카프 레이즈', sets: 5, reps: '15-20회' },
        ]
    ],
    upper2: [
        [
            { name: '인클라인 벤치 프레스', sets: 4, reps: '6-10회' },
            { name: 'T-바 로우', sets: 4, reps: '8-12회' },
            { name: '덤벨 숄더 프레스', sets: 3, reps: '8-12회' },
            { name: '트라이셉스 푸시다운', sets: 4, reps: '10-15회' },
            { name: '바이셉스 컬', sets: 4, reps: '10-15회' },
        ],
        [
            { name: '중량 딥스', sets: 4, reps: '6-10회' },
            { name: '랫 풀다운', sets: 4, reps: '8-12회' },
            { name: '아놀드 프레스', sets: 3, reps: '10-15회' },
            { name: '스컬 크러셔', sets: 3, reps: '10-15회' },
            { name: '해머 컬', sets: 3, reps: '12-15회' },
        ]
    ],
    lower2: [
        [
            { name: '프론트 스쿼트', sets: 4, reps: '6-10회' },
            { name: '굿모닝', sets: 3, reps: '10-15회' },
            { name: '런지', sets: 3, reps: '다리당 12-15회' },
            { name: '레그 익스텐션', sets: 3, reps: '15-20회' },
        ],
        [
            { name: '핵 스쿼트', sets: 4, reps: '8-12회' },
            { name: '스티프 레그 데드리프트', sets: 3, reps: '8-12회' },
            { name: '불가리안 스플릿 스쿼트', sets: 3, reps: '다리당 10-15회' },
            { name: '라잉 레그 컬', sets: 3, reps: '12-15회' },
        ]
    ]
};

document.addEventListener('DOMContentLoaded', () => {
    const workoutDisplay = document.getElementById('workout-display');
    const dayButtons = document.querySelectorAll('.day-btn');
    const changeWorkoutBtn = document.getElementById('change-workout');

    let currentDay = 'upper1';
    let workoutVariations = { upper1: 0, lower1: 0, upper2: 0, lower2: 0 };

    function showWorkout(day) {
        currentDay = day;
        workoutDisplay.innerHTML = '';
        dayButtons.forEach(btn => btn.classList.remove('active'));
        document.getElementById(day).classList.add('active');

        const variationIndex = workoutVariations[day];
        const selectedWorkout = workouts[day][variationIndex];
        
        selectedWorkout.forEach(exercise => {
            const exerciseCard = document.createElement('exercise-card');
            exerciseCard.setAttribute('name', exercise.name);
            exerciseCard.setAttribute('sets', exercise.sets);
            exerciseCard.setAttribute('reps', exercise.reps);
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

    showWorkout('upper1'); // 기본으로 첫번째 상체 운동을 보여줍니다.
});
