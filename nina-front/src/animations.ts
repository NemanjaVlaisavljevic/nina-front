import {
    trigger,
    animate,
    transition,
    style,
    query,
    state
  } from '@angular/animations';
  
  export const fadeAnimation = trigger('fadeAnimation', [
    transition('cart => *', [
      query(':enter, :leave', style({ position: 'absolute', top: 0, left: 0, right: 0 }), {optional: true}),
      query(':enter', [style({ opacity: 0 })], { optional: true }),
      query(':leave', [style({ opacity: 1, height: "100%"}), animate('0.3s', style({ opacity: 0 }))], { optional: true }),
      query(':enter', [style({ opacity: 0, height: "100%"}), animate('0.3s', style({ opacity: 1 }))], { optional: true })
    ]),
    transition('* => *', [
      query(':enter, :leave', style({ position: 'absolute', top: 0, left: 0, right: 0 }), {optional: true}),
      query(':enter', [style({ opacity: 0 })], { optional: true }),
      query(':leave', [style({ opacity: 1, height: "100%", overflow: 'hidden'}), animate('0.3s', style({ opacity: 0 }))], { optional: true }),
      query(':enter', [style({ opacity: 0, height: "100%", overflow: 'hidden'}), animate('0.3s', style({ opacity: 1 }))], { optional: true })
    ])
  ]);