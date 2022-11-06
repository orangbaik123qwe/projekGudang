<!DOCTYPE html>
<html lang="en">
	<head>
		<title>{{$title}}</title>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<link rel="shortcut icon" href="/file/logo" />

		<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700" />
		<link href="/assets/plugins/global/plugins.bundle.css" rel="stylesheet" type="text/css" />
		<link href="/assets/css/style.bundle.css" rel="stylesheet" type="text/css" />

	</head>
	<body id="kt_body" class="bg-body">

		<style>
			.head-judul{
				font-size: 64px;
			}
			@media only screen and (max-width: 600px) {
				.head-judul{
					font-size: 32px;
				}
			}
		</style>
		<div class="d-flex flex-column flex-root">
			<div class="d-flex flex-column flex-lg-row flex-column-fluid">
				<div class="d-flex flex-column flex-lg-row-auto w-xl-600px positon-xl-relative">
					<div class="d-flex flex-column position-xl-fixed top-0 bottom-0 w-xl-600px scroll-y" style="background-image: url(/images/login-img.jpg); -webkit-background-size: cover;  -moz-background-size: cover;  -o-background-size: cover;  background-size: cover;">
					</div>
				</div>
				<div class="d-flex flex-column flex-lg-row-fluid">
					<div class="d-flex flex-center flex-column flex-column-fluid">
						<div class="w-lg-500px mx-auto">
							<form class="form w-100 mx-2 mx-md-0"  id="kt_sign_in_form" action="/register" method="post">
								{{-- <input type="hidden" name="pathLog" value="app-login"> --}}
                                @csrf
								<div class="mb-10 mt-10 mt-md-0">
									<h1 class="head-judul" style=" color: #264a8a; ">
										<img alt="Logo" src="/images/icon.jpg" class="h-45px h-md-90px logo"/> SiMOGU
									</h1>
									<h4 class="fs-3 fs-md-2 mt-5 mt-md-0 " style=" color: #264a8a; font-weight: 500;">Sistem Monitoring Gudang</h4>
								</div>
								<div class="fv-row mb-10">
									<label class="form-label fs-6 fw-bolder text-dark">Nama <span class="text-danger">*</span></label>
									<input class="form-control form-control-lg form-control-solid " type="hidden" name="user_id" />
									<input class="form-control form-control-lg form-control-solid @error('user_name') is-invalid @enderror " type="text" name="user_name" value="{{ old('user_name') }}" placeholder="Masukkan nama anda" autocomplete="off" />
									@error ('user_name')
									<div class="invalid-feedback">
										{{$message}}
									</div>
									@enderror
								</div>
								<div class="fv-row mb-10">
									<label class="form-label fs-6 fw-bolder text-dark">Email <span class="text-danger">*</span></label>
									<input class="form-control form-control-lg form-control-solid @error('user_email') is-invalid @enderror" type="email" name="user_email" value="{{ old('user_email') }}" placeholder="Masukkan email anda" autocomplete="off" />
									@error ('user_email')
									<div class="invalid-feedback">
										{{$message}}
									</div>
									@enderror
								</div>
								<div class="fv-row mb-10">
									<label class="form-label fs-6 fw-bolder text-dark">Username <span class="text-danger">*</span></label>
									<input class="form-control form-control-lg form-control-solid @error('user_username') is-invalid @enderror" type="text" name="user_username" value="{{ old('user_usernama') }}" placeholder="Masukkan username anda"/>
									@error ('user_username')
									<div class="invalid-feedback">
										{{$message}}
									</div>
									@enderror
								</div>
								<div class="fv-row mb-10">
									<div class="d-flex flex-stack mb-2">
										<label class="form-label fw-bolder text-dark fs-6 mb-0">Password <span class="text-danger">*</span></label>
									</div>
									<input class="form-control form-control-lg form-control-solid @error('user_password') is-invalid @enderror" type="password" name="user_password" value="{{ old('user_password') }}" placeholder="Masukkan password anda"/>
									@error ('user_password')
									<div class="invalid-feedback">
										{{$message}}
									</div>
									@enderror
								</div>
								
								<div class="text-center">
									<button type="submit" id="kt_sign_in_submit" class="btn btn-lg btn-warning w-100 mb-5">
										<span class="indicator-label text-dark">Register</span>
										<span class="indicator-progress">Please wait...
										<span class="spinner-border spinner-border-sm align-middle ms-2"></span></span>
									</button>
									<!-- <div class="text-center text-muted text-uppercase fw-bolder mb-5">or</div>
									<a href="#" class="btn btn-flex flex-center btn-light btn-lg w-100 mb-5">
										<img alt="Logo" src="/assets/media/svg/brand-logos/google-icon.svg" class="h-20px me-3" />
										Continue with Google
									</a> -->
								</div>
							</form>
						</div>
					</div>
				</div>

				
			</div>
		</div>

		<script type="text/javascript">var APP_URL = "/";</script>

		<script src="/assets/plugins/global/plugins.bundle.js"></script>
		<script src="/assets/js/scripts.bundle.js"></script>
		{{-- <script src="/assets/js/custom/authentication/sign-in/general.js"></script> --}}
		{{-- <script src="https://www.google.com/recaptcha/api.js"></script> --}}

	</body>
</html>