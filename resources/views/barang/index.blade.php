<div class="row " data-roleable="true">
    <div class="col-xl-12 dataIndex ">
        <div class="card shadow">
            <div class="card-header boder-0 ">
                <div class="card-toolbar">
                    @include('barang.form')
                </div>
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table table-striped table-row-bordered border align-middle rounded tdFirstCenter"
                        id="table_barang">
                        <thead class="text-center">
                            <tr class="fw-bolder">
                                <td class="ps-4">No</td>
                                <td>Kode</td>
                                <td>Nama</td>
                                <td with="10">Aksi</td>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
@include('barang.javascript') 