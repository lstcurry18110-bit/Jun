
class ExerciseCard extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });

        const style = document.createElement('style');
        style.textContent = `
            :host {
                display: block;
                background-color: #2a2a2a;
                border-radius: 8px;
                padding: 20px;
                box-shadow: 0 4px 8px rgba(0,0,0,0.3);
            }
            h3 {
                margin: 0 0 10px;
                color: #fff;
                font-size: 1.5em;
            }
            p {
                margin: 0;
                color: #ccc;
            }
        `;

        const wrapper = document.createElement('div');
        const name = document.createElement('h3');
        name.textContent = this.getAttribute('name');
        const sets = document.createElement('p');
        sets.textContent = `Sets: ${this.getAttribute('sets')}`;
        const reps = document.createElement('p');
        reps.textContent = `Reps: ${this.getAttribute('reps')}`;

        shadow.appendChild(style);
        shadow.appendChild(wrapper);
        wrapper.appendChild(name);
        wrapper.appendChild(sets);
        wrapper.appendChild(reps);
    }
}
customElements.define('exercise-card', ExerciseCard);

const workouts = {
    'chest-triceps': [
        { name: 'Bench Press', sets: 4, reps: '8-12' },
        { name: 'Incline Dumbbell Press', sets: 3, reps: '10-15' },
        { name: 'Cable Crossovers', sets: 3, reps: '12-15' },
        { name: 'Tricep Pushdowns', sets: 4, reps: '10-15' },
        { name: 'Overhead Tricep Extension', sets: 3, reps: '10-15' },
    ],
    'back-biceps': [
        { name: 'Pull-ups', sets: 4, reps: 'As many as possible' },
        { name: 'Barbell Rows', sets: 4, reps: '8-12' },
        { name: 'T-Bar Rows', sets: 3, reps: '10-15' },
        { name: 'Barbell Curls', sets: 4, reps: '10-12' },
        { name: 'Hammer Curls', sets: 3, reps: '12-15' },
    ],
    'legs-shoulders': [
        { name: 'Squats', sets: 4, reps: '8-12' },
        { name: 'Leg Press', sets: 4, reps: '10-15' },
        { name: 'Romanian Deadlifts', sets: 3, reps: '10-15' },
        { name: 'Overhead Press', sets: 4, reps: '8-12' },
        { name: 'Lateral Raises', sets: 3, reps: '12-15' },
    ],
};

document.addEventListener('DOMContentLoaded', () => {
    const workoutDisplay = document.getElementById('workout-display');

    document.getElementById('chest-triceps').addEventListener('click', () => showWorkout('chest-triceps'));
    document.getElementById('back-biceps').addEventListener('click', () => showWorkout('back-biceps'));
    document.getElementById('legs-shoulders').addEventListener('click', () => showWorkout('legs-shoulders'));

    function showWorkout(workoutType) {
        workoutDisplay.innerHTML = '';
        const selectedWorkout = workouts[workoutType];
        selectedWorkout.forEach(exercise => {
            const exerciseCard = document.createElement('exercise-card');
            exerciseCard.setAttribute('name', exercise.name);
            exerciseCard.setAttribute('sets', exercise.sets);
            exerciseCard.setAttribute('reps', exercise.reps);
            workoutDisplay.appendChild(exerciseCard);
        });
    }
});
