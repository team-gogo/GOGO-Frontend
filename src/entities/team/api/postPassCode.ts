// const getToken = (): string => {
//   return '';
// };

// export const postPassCode = async (stageId: string, passCode: string) => {
//   try {
//     const token = getToken();

//     const response = await fetch(`/api/join/${stageId}`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: token,
//       },
//       body: JSON.stringify({
//         passCode: passCode,
//       }),
//     });

//     if (!response.ok) {
//       throw new Error(response.status.toString());
//     }

//     return await response.json();
//   } catch (error) {
//     console.error(error);
//     return null;
//   }
// };
