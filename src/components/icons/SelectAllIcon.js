import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';

/*
    Minified the Inkscape svg with https://jakearchibald.github.io/svgomg/
*/
export default function SelectAllIcon(props) {
  return (
    <SvgIcon>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path d="M0 21.602h2.398V24H0zM1.2 18H0v2.398h1.2zm0-3.602H0v2.403h1.2zm0-3.597H0v2.398h1.2zm0-3.602H0v2.403h1.2zm0-3.597H0V6h1.2zM21.601 24H24v-2.398h-2.398zm1.199-3.602H24V18h-1.2zm0-3.597H24v-2.403h-1.2zm0-3.602H24v-2.398h-1.2zm0-3.597H24V7.199h-1.2zM22.8 6H24V3.602h-1.2zm-1.2-6v2.398H24V0zM0 2.398h2.398V0H0zM6 0H3.602v1.2H6zm3.602 0H7.199v1.2h2.403zm3.597 0h-2.398v1.2h2.398zm3.602 0h-2.403v1.2h2.403zM18 1.2h2.398V0H18zM3.602 24H6v-1.2H3.602zm3.597 0h2.403v-1.2H7.199zm3.602 0h2.398v-1.2h-2.398zm3.597 0h2.403v-1.2h-2.403zM18 24h2.398v-1.2H18zM10.8 3.602H3.603V10.8H10.8zm0 9.597H3.603v7.2H10.8zm2.4 7.2h7.198v-7.2H13.2zm0-9.598h7.198V3.6H13.2zm0 0" />
      </svg>
    </SvgIcon>
  );
}
