<div class="d-flex align-items-center ms-1 ms-lg-3" id="kt_header_user_menu_toggle">
	
	<div class="cursor-pointer symbol symbol-30px symbol-md-40px" data-kt-menu-trigger="click" data-kt-menu-attach="parent" data-kt-menu-placement="bottom-end">
		Welcome, <strong>Fullname </strong>
		<img class="circle" style="margin-left:10px" height="36px" width="36px" src="https://i.pinimg.com/280x280_RS/2e/45/66/2e4566fd829bcf9eb11ccdb5f252b02f.jpg">
	</div>
	<div class=" card menu menu-sub menu-sub-dropdown shadow fw-bold" style="width:350px" data-kt-menu="true">
		<div class="card-header d-flex align-items-center">
			<span class="fs-4 fw-bold px-5 mb-2">User Profile</span>
		</div>
		<div class="card-body">
			<div class="row">
				<div class="col-4 d-flex align-items-center justify-content-center">
					<img class="rounded-2" style="margin-left:10px" height="75px" width="75px" src="https://cdn.imagecomics.com/assets/img/default-user-square.svg">
				</div>
				<div class="col-8 d-flex align-items-center ">
					<div class="row">
						<span class="fs-5 fw-bold">Fullname </span>
						<span class="fw-normal">Email </span>
						<div class="d-flex flex-row mt-3">
							<a href="javascript:;" data-con="j93ck5d81mt44dlw" onclick="HELPER.loadPage(this)" class="btn btn-sm btn-warning text-dark">Edit Profile</a>
						<!-- </div>
						<div class="col-6 mt-3"> -->
							<form action="/logout" method="post">
								@csrf
								<button type="submit" class="btn btn-sm btn-danger mx-2">Logout</button>
								{{-- <a href="javascript:HELPER.logout(1)" class="btn btn-sm btn-danger mx-2">Logout</a> --}}
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- <div class="menu-item px-5 ">
		</div>
		<div class="menu-item px-5">
			<a href="javascript:HELPER.logout(1)" class="menu-link px-5">Logout</a>
		</div> -->
	</div>
</div>