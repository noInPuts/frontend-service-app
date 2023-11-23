
export default function ResturantLoginPage() {
    return (
        <>
            <form>
  <div className="form-outline mb-4">
    <input type="email" id="formUserName" className="form-control" />
    <label className="form-label" >Username</label>
  </div>

  <div className="form-outline mb-4">
    <input type="password" id="formPassWord" className="form-control" />
    <label className="form-label">Password</label>
  </div>

  <div className="row mb-4">


  <button type="button" className="btn btn-primary btn-block mb-4">Sign in</button>

  </div>
</form>
            
        </>
    );
}