/**
 * @desc convert hex to string
 * @param {hex} hex
 * @return {string} result
 */
function hex2String(hex) {
  // convert to string
  const hexString = hex.toString();
  // initialize result variable
  var result = '';

  // derive characters from hex string
  for (
    var i = 0;
    i < hexString.length && hexString.substr(i, 2) !== '00';
    i += 2
  ) {
    result += String.fromCharCode(parseInt(hexString.substr(i, 2), 16));
  }
  // console.log('result: ', result);
  return result;
}

/**
 * @desc convert string to hex using Buffer
 * @param {string} str
 * @return {hex string} hexString
 */
function string2Hex(str) {
  // convert string into buffer
  let bufStr = Buffer.from(str, 'utf8');

  // convert buffer to hex string
  const hexString = bufStr.toString('hex');

  // console.log('hexString: ', hexString);
  return hexString;
}

/**
 * @desc test if content/memoData exceeds 1kb limit
 * @param {string} content
 * @return {object} {isLengthValid: bool, overage: number}
 */
function testContentLength(content) {
  // Convert content to hex
  const data = string2Hex(content);
  // console.log('data: ', data.length);

  // Create memos field array
  const memos = [
    {
      Memo: {
        MemoData: data
      }
    }
  ];

  // toJson
  const memosField = JSON.stringify(memos);

  // check size
  const fieldLength = memosField.length;
  // console.log('memos length: ', fieldLength);

  const isLengthValid = fieldLength < 1000;

  // return result
  return { isLengthValid, overage: isLengthValid ? 0 : fieldLength - 1001 };
}

export { hex2String, string2Hex, testContentLength };
