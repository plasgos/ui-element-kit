import React from "react";
import { IoSearch } from "react-icons/io5";

export const ReceiverDetails = () => {
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center my-4">
        <div className="font-weight-bold font-lg">Detail Penerima</div>

        <button className="btn btn-outline-primary">
          <IoSearch size={18} className="mr-2" />
          <span>Cari Penerima</span>
        </button>
      </div>
      <div className="card p-3 shadow-sm rounded">
        <form>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label className="required-label">Nama Penerima</label>
              <input type="text" className="form-control" />
            </div>
            <div className="form-group col-md-6">
              <label className="required-label">Nomor Telepon</label>
              <input type="text" className="form-control" />
            </div>
          </div>
          <div className="form-group">
            <label className="required-label">Kecamatan</label>
            <input type="text" className="form-control" />
          </div>
          <div className="form-group">
            <label className="required-label">Alamat Penerima</label>
            <textarea type="text" className="form-control" />
          </div>
        </form>
      </div>
    </div>
  );
};