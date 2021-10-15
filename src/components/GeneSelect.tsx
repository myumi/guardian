// import { useDispatch, useSelector } from 'react-redux';

// interface GeneSelectProps {
//   type: string;
//   id: string;
// };

// export default function ColorSelect({ type, id } : GeneSelectProps) {
//   const dispatch = useDispatch();
//   const value = useSelector((state: any) => state.dragons[id][type]);

//   // when user changes color, update the store
//   const handleChange = (event: any) => {
//     dispatch({type: `dragon/${id}Colors`, payload: {[type]: +event.target.value}});
//   };

//   return (
//     <select 
//       className="color-select" 
//       id={`${id}_${type}`} 
//       value={value} 
//       onChange={handleChange}
//     >
//       {/* the default value is the type (primary, secondary, etc) */}
//       <option value="-1">({type.split('_')[0]} color)</option>

//       {/* all of the colors in the color wheel, in order */}
//       {
//         colorWheel.map(({ colorName }, idx) => {
//           return (
//             <option key={idx} value={idx}>{colorName.toLowerCase()}</option>
//           );
//         })
//       }
//     </select>
//   );
// };

export default {};
