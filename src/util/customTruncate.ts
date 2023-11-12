export const customTruncate = (str: string|null, length: number): string => {
    if(str){
        if (str.length <= length) {
            return str;
          } else {
            return str.substring(0, length) + "...";
          }

    }else{
        return ""
    }
};
