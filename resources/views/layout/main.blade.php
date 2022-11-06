<!DOCTYPE html>
<html lang="en">
	<head>
		<title>APK</title>
		<meta charset="utf-8" />
		<meta name="description" content="" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<meta name="csrf-token" content="{{ csrf_token() }}" />
		<link rel="shortcut icon" href="/file/logo" />
		
		<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700" />
		<link href="/assets/plugins/global/plugins.bundle.css" rel="stylesheet" type="text/css" />
		<link href="/assets/css/style.bundle.css" rel="stylesheet" type="text/css" />
		<link href="/assets/plugins/custom/jstree/jstree.bundle.css" rel="stylesheet" type="text/css" />
		<link href="/assets/css/jquery-confirm.css" rel="stylesheet" type="text/css"/>`
		<link href="/assets/plugins/custom/datatables/datatables.bundle.css" rel="stylesheet" type="text/css"/>
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
		<style type="text/css">
			.cp{
				cursor: pointer;
			}

			table.tdFirstCenter tbody tr td:first-child {
				text-align: center;
			}

			tr.clickable {
				cursor: pointer;
				-webkit-touch-callout: none;
				/* iOS Safari */
				-webkit-user-select: none;
				/* Chrome/Safari/Opera */
				-khtml-user-select: none;
				/* Konqueror */
				-moz-user-select: none;
				/* Firefox */
				-ms-user-select: none;
				/* IE/Edge */
				user-select: none;
				/* non-prefixed version, currently */
			}

			tr.selectedRow {
				background-color: #f7f9fb;
				font-style: italic;
				font-weight: bold;
			}

			.btn.btn-icon {
			    height: calc(1em + 1rem + 5px);
			    width: calc(1em + 1rem + 5px);
			}

			.aside .aside-logo {
			    height: 150px;
			}

			.aside.aside-dark {
			    background-color: #264a8a;
			}

			.aside.aside-dark .aside-logo {
			    background-color: #172f59;
			}

			.aside-dark .menu .menu-item.hover > .menu-link:not(.disabled):not(.active), .aside-dark .menu .menu-item .menu-link:hover:not(.disabled):not(.active) {
			    transition: color 0.2s ease;
			    background-color: #2b5aad;
			    color: #ffffff;
			}

			.aside.aside-dark .btn-custom {
			    color: #172f59;
			    background-color: rgb(255 255 255);
			}

			
		</style>
	</head>
	
	<body id="kt_body" class="header-fixed header-tablet-and-mobile-fixed toolbar-enabled toolbar-fixed aside-enabled aside-fixed" style="--kt-toolbar-height:55px;--kt-toolbar-height-tablet-and-mobile:55px">
		
		<div class="d-flex flex-column flex-root">
			<div class="page d-flex flex-row flex-column-fluid">
				<div id="kt_aside" class="aside aside-dark aside-hoverable" data-kt-drawer="true" data-kt-drawer-name="aside" data-kt-drawer-activate="{default: true, lg: false}" data-kt-drawer-overlay="true" data-kt-drawer-width="{default:'200px', '300px': '250px'}" data-kt-drawer-direction="start" data-kt-drawer-toggle="#kt_aside_mobile_toggle">
					<div class="aside-logo flex-column-auto" id="kt_aside_logo">
						<a href="">
							<!-- halo -->
							<img alt="Logo" src="/images/icon.jpg" class="h-100px logo ms-15 rounded-3" />
						</a>
						<div id="kt_aside_toggle" class="btn btn-icon w-auto px-0 btn-active-color-primary aside-toggle" data-kt-toggle="true" data-kt-toggle-state="active" data-kt-toggle-target="body" data-kt-toggle-name="aside-minimize">
							<span class="svg-icon svg-icon-1 rotate-180 ">
								<svg class="text-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
									<path opacity="0.5" d="M14.2657 11.4343L18.45 7.25C18.8642 6.83579 18.8642 6.16421 18.45 5.75C18.0358 5.33579 17.3642 5.33579 16.95 5.75L11.4071 11.2929C11.0166 11.6834 11.0166 12.3166 11.4071 12.7071L16.95 18.25C17.3642 18.6642 18.0358 18.6642 18.45 18.25C18.8642 17.8358 18.8642 17.1642 18.45 16.75L14.2657 12.5657C13.9533 12.2533 13.9533 11.7467 14.2657 11.4343Z" fill="black" />
									<path d="M8.2657 11.4343L12.45 7.25C12.8642 6.83579 12.8642 6.16421 12.45 5.75C12.0358 5.33579 11.3642 5.33579 10.95 5.75L5.40712 11.2929C5.01659 11.6834 5.01659 12.3166 5.40712 12.7071L10.95 18.25C11.3642 18.6642 12.0358 18.6642 12.45 18.25C12.8642 17.8358 12.8642 17.1642 12.45 16.75L8.2657 12.5657C7.95328 12.2533 7.95328 11.7467 8.2657 11.4343Z" fill="black" />
								</svg>
							</span>
						</div>
					</div>
					
					@include('layout.sidebar')
					<div class="aside-footer flex-column-auto pt-5 pb-7 px-5" id="kt_aside_footer">
						<a href="" class="btn btn-custom btn-primary w-100" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-dismiss-="click" title="200+ in-house components and 3rd-party plugins">
							<span class="btn-label">Docs &amp; Components</span>
							<span class="svg-icon btn-icon svg-icon-2">
								<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
									<path opacity="0.3" d="M19 22H5C4.4 22 4 21.6 4 21V3C4 2.4 4.4 2 5 2H14L20 8V21C20 21.6 19.6 22 19 22ZM15 17C15 16.4 14.6 16 14 16H8C7.4 16 7 16.4 7 17C7 17.6 7.4 18 8 18H14C14.6 18 15 17.6 15 17ZM17 12C17 11.4 16.6 11 16 11H8C7.4 11 7 11.4 7 12C7 12.6 7.4 13 8 13H16C16.6 13 17 12.6 17 12ZM17 7C17 6.4 16.6 6 16 6H8C7.4 6 7 6.4 7 7C7 7.6 7.4 8 8 8H16C16.6 8 17 7.6 17 7Z" fill="black" />
									<path d="M15 8H20L14 2V7C14 7.6 14.4 8 15 8Z" fill="black" />
								</svg>
							</span>
						</a>
					</div>
				</div>
				<div class="wrapper d-flex flex-column flex-row-fluid" id="kt_wrapper">
					<div id="kt_header" style="" class="header align-items-stretch">
						<div class="container-fluid d-flex align-items-stretch justify-content-between">
							<div class="d-flex align-items-center d-lg-none ms-n3 me-1" title="Show aside menu">
								<div class="btn btn-icon btn-active-light-primary w-30px h-30px w-md-40px h-md-40px" id="kt_aside_mobile_toggle">
									<span class="svg-icon svg-icon-2x mt-1">
										<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
											<path d="M21 7H3C2.4 7 2 6.6 2 6V4C2 3.4 2.4 3 3 3H21C21.6 3 22 3.4 22 4V6C22 6.6 21.6 7 21 7Z" fill="black" />
											<path opacity="0.3" d="M21 14H3C2.4 14 2 13.6 2 13V11C2 10.4 2.4 10 3 10H21C21.6 10 22 10.4 22 11V13C22 13.6 21.6 14 21 14ZM22 20V18C22 17.4 21.6 17 21 17H3C2.4 17 2 17.4 2 18V20C2 20.6 2.4 21 3 21H21C21.6 21 22 20.6 22 20Z" fill="black" />
										</svg>
									</span>
								</div>
							</div>
							<div class="d-flex align-items-center flex-grow-1 flex-lg-grow-0">
								<a href="" class="d-lg-none">
									<img alt="Logo" src="/assets/media/logos/logo-2.svg" class="h-30px" />
								</a>
							</div>
							<div class="d-flex align-items-stretch justify-content-between flex-lg-grow-1">

								@include('layout.navbar')
								
								<div class="d-flex align-items-stretch flex-shrink-0">
									<div class="d-flex align-items-stretch flex-shrink-0">
										@include('layout.notif')
										@include('layout.profile')
										<div class="d-flex align-items-center d-lg-none ms-2 me-n3" title="Show header menu">
											<div class="btn btn-icon btn-active-light-primary w-30px h-30px w-md-40px h-md-40px" id="kt_header_menu_mobile_toggle">
												<span class="svg-icon svg-icon-1">
													<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
														<path d="M13 11H3C2.4 11 2 10.6 2 10V9C2 8.4 2.4 8 3 8H13C13.6 8 14 8.4 14 9V10C14 10.6 13.6 11 13 11ZM22 5V4C22 3.4 21.6 3 21 3H3C2.4 3 2 3.4 2 4V5C2 5.6 2.4 6 3 6H21C21.6 6 22 5.6 22 5Z" fill="black" />
														<path opacity="0.3" d="M21 16H3C2.4 16 2 15.6 2 15V14C2 13.4 2.4 13 3 13H21C21.6 13 22 13.4 22 14V15C22 15.6 21.6 16 21 16ZM14 20V19C14 18.4 13.6 18 13 18H3C2.4 18 2 18.4 2 19V20C2 20.6 2.4 21 3 21H13C13.6 21 14 20.6 14 20Z" fill="black" />
													</svg>
												</span>
											</div>
										</div>

									</div>
								</div>
							</div>
						</div>
					</div>
					
					<div class="content d-flex flex-column flex-column-fluid pt-0 ps-0" id="kt_content">
						<div class="toolbar" id="kt_toolbar">
							<div id="kt_toolbar_container" class="container-fluid d-flex flex-stack">
								<div data-kt-swapper="true" data-kt-swapper-mode="prepend" data-kt-swapper-parent="{default: '#kt_content_container', 'lg': '#kt_toolbar_container'}" class="page-title d-flex align-items-center flex-wrap me-3 mb-5 mb-lg-0">
									<div class=" fw-bold fs-4 fs-md-2" id="titleContent">
										{{$title}}
									</div>
								</div>
							</div>
						</div>
						@include('layout.content')
						

					</div>
					@include('layout.footer')
				</div>
			</div>
		</div>
		
		<div id="kt_scrolltop" class="scrolltop" data-kt-scrolltop="true">
			<span class="svg-icon">
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
					<rect opacity="0.5" x="13" y="6" width="13" height="2" rx="1" transform="rotate(90 13 6)" fill="black" />
					<path d="M12.5657 8.56569L16.75 12.75C17.1642 13.1642 17.8358 13.1642 18.25 12.75C18.6642 12.3358 18.6642 11.6642 18.25 11.25L12.7071 5.70711C12.3166 5.31658 11.6834 5.31658 11.2929 5.70711L5.75 11.25C5.33579 11.6642 5.33579 12.3358 5.75 12.75C6.16421 13.1642 6.83579 13.1642 7.25 12.75L11.4343 8.56569C11.7467 8.25327 12.2533 8.25327 12.5657 8.56569Z" fill="black" />
				</svg>
			</span>
		</div>
		@include('layout.javascript')

		<script src="/assets/plugins/global/plugins.bundle.js"></script>
		<script src="/assets/js/scripts.bundle.js"></script>
		<script src="/assets/plugins/custom/jstree/jstree.bundle.js"></script>
		<script src="assets/plugins/custom/ckeditor/ckeditor-balloon.bundle.js"></script>
		<script src="/assets/plugins/custom/datatables/datatables.bundle.js"></script>

		<script src="/assets/import/jquery.blockUI.js"></script>
		<script src="/assets/import/helper/sanitize.js"></script>
		<script src="/assets/import/helper/js.cookie.js"></script>
		<script src="/assets/import/helper/helper.js"></script>
		<script src="/assets/js/jquery-confirm.js"></script>

		<script src="https://cdn.amcharts.com/lib/4/core.js"></script>
		<script src="https://cdn.amcharts.com/lib/4/charts.js"></script>
		<script src="https://cdn.amcharts.com/lib/4/themes/animated.js"></script>

		<!-- <script src="/assets/plugins/custom/amcharts/charts.js"></script>
		<script src="/assets/plugins/custom/amcharts/core.js"></script>
		<script src="/assets/plugins/custom/amcharts/maps.js"></script>
		<script src="/assets/plugins/custom/amcharts/themes/material.js"></script>
		<script src="/assets/plugins/custom/amcharts/themes/animated.js"></script>
		<script src="/assets/plugins/custom/amcharts/lang/de_DE.js"></script> -->

		<!--  -->

	</body>
</html>