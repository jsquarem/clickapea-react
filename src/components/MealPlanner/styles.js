import { styled } from '@stitches/react';

// export const MainWrapper = styled("div", {
//   width: 240,
//   borderRadius: 10,
//   padding: 20,
//   backgroundColor: "white",
//   boxShadow: "-6px 7px 54px -24px rgba(0,0,0,0.5)",
//   fontFamily: "Anek Telugu",
// });

export const CalendarHeaderWrapper = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

export const WeekDaysWrapper = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
});

export const WeekDayCell = styled('div', {
  height: 30,
  width: 30,
  margin: 2,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#9BA4B4',
});

export const CalendarContentWrapper = styled('div', {
  display: 'flex',
  flexDirection: 'row',
});

export const CalendarDayCell = styled('div', {
  height: 30,
  width: 30,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 6,
  margin: 2,

  variants: {
    variant: {
      default: {
        color: '#1B1B2F',
      },
      today: {
        color: '#E43F5A',
      },
      nextMonth: {
        color: '#DAE1E7',
      },
    },
  },
});
