let background
const duration = 235
const stripeId = [
  {id: 1,color: '#5AF', delay: 0.2},
  {id: 3,color: '#A5F', delay: 0.8},
  {id: 2,color: '#FA5', delay: 0.4},
  {id: 5,color: '#FF5', delay: 0},
  {id: 4,color: '#AF5', delay: 0.6},
];

let stripes = []

export function show() {
  return animateInAll();
}

export function hide() {
  return animateOutAll();
}
export function initBackground (wrapper: Element) {
  background = document.createElement('div');
  background.classList.add('stripped-background');
  for (const data of stripeId) {
    const stripe: any = document.createElement('div');
    stripe.classList.add(`stripe-${data.id}`);
    stripe.style.height = `${600 / stripeId.length}px`;
    stripe.style.zIndex = 100 - data.id;
    stripe.style.left = '-850px';
    stripe.style.backgroundColor = data.color;
    background.appendChild(stripe);
    stripes.push({
      element: stripe,
      data
    });
  }
  wrapper.appendChild(background);
}

function animateInStripe (stripe) {
  return new Promise((resolve, reject) => {
    const data = stripe.data
    const anim = stripe.element.animate([
      { left: "850px", offset: 0},
      { left: "0", offset: 1}
    ], {
      duration, //milliseconds
      easing: 'ease-in', //'linear', a bezier curve, etc.
      delay: data.delay * duration, //milliseconds
      fill: 'both' //'backwards', 'both', 'none', 'auto'
    });
    stripe.animation = anim
    anim.onfinish = resolve;
  });
}

function animateOutStripe (stripe) {
  return new Promise((resolve, reject) => {
    const data = stripe.data
    const anim = stripe.element.animate([
      { left: "0", offset: 0},
      { left: "-850px", offset: 1}
    ], {
      duration, //milliseconds
      easing: 'ease-out', //'linear', a bezier curve, etc.
      delay: data.delay * duration, //milliseconds
      fill: 'both' //'backwards', 'both', 'none', 'auto'
    });
    stripe.animation = anim
    anim.onfinish = resolve
  });
}

function animateInAll () {
  return Promise.all(stripes.map(animateInStripe));
}

function animateOutAll () {
  return Promise.all(stripes.map(animateOutStripe));
}


