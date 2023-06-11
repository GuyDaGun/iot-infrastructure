
class CustomAPIError extends Error {
  statusCode: number;
  errors?: any;
  code: any;
  keyValue: any;
  
  constructor(message:string) {
    super(message);
  }
}

export default CustomAPIError;
