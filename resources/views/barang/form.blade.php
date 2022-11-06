<a href="#" data-bs-toggle="modal" data-bs-target="#modal_form" class="my-5 btn btn-sm btn-warning text-dark"
    data-roleable="true">
    <i class="fa fa-plus text-dark"></i> Tambah Barang
</a>
<div class="col-lg-8 ">
    
    <div class="modal fade" id="modal_form" tabindex="-1">
        <div class="modal-dialog modal-lg modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">
                        Barang
                    </h5>
                    <div class="btn btn-icon btn-sm btn-active-secondary ms-2 bg-warning" data-bs-dismiss="modal"
                        aria-label="Close">
                        <!-- <span class="svg-icon svg-icon-2x"></span>  -->
                        <i class="text-dark fa fa-times"></i>
                    </div>
                </div>

                <div class="modal-body">
                    <form action="javascript:onSave(this)" method="post" id="form_barang" name="form_barang"
                        autocomplete="off" enctype="multipart/form-data">
                        <input type="hidden" name="barang_id">

                        <div class="fv-row mb-5">
                            <label for="barang_kode" class="required form-label">Kode Barang</label>
                            <input type="text" name="barang_kode" id="barang_kode"
                                class="form-control form-control-sm form-control-solid" placeholder="Kode Barang"
                                required />
                        </div>

                        <div class="fv-row mb-5">
                            <label for="barang_nama" class="required form-label">Nama Barang</label>
                            <input type="text" name="barang_nama" id="barang_nama"
                                class="form-control form-control-sm form-control-solid" placeholder="Nama Barang"
                                required />
                        </div>

                        <div class="fv-row pt-5">
                            <button type="submit" class="col-12 btn btn-warning text-dark"><i class="fa fa-save text-dark fw-lighter fs-2"></i> Simpan</button>
                        </div>
                        
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>