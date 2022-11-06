<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Main;
use Illuminate\Support\Facades\DB; 
use Illuminate\Support\Facades\Session;

class MainController extends Controller
{
    public function index()
    {
        return view('layout.main',[
			'title' => 'Main'
		]);
    }

    public function getPage()
	{
        $userData = Session::get('userdata');
        $userId = $userData->user_id;

        $menus = DB::table('v_role_menus')->where([
            ['user_id', $userId],
            ['menu_active', 1],
        ])->orderBy('menu_order','asc')->get()->toArray();

        // $menusNav = DB::table('v_role_menus')->where([
        //     ['user_id', $userId],
        //     ['menu_active', 1],
        //     ['menu_navbar', 1]
        // ])->orderBy('menu_order','asc')->get()->toArray();

        // $menusSide = DB::table('v_role_menus')->where([
        //     ['user_id', $userId],
        //     ['menu_active', 1],
        //     ['menu_navbar', 0]
        // ])->orderBy('menu_order','asc')->get()->toArray();

        $collect  	= collect($menus); 
        // print_r($collect->where('menu_navbar',0)->all()); 

        $dataMenu = [
            'navbar' => $this->getNavbar($collect->where('menu_navbar',1)->all()),
			'sidebar' => $this->getSidebar($collect->where('menu_navbar',0)->all())
        ];
        return $dataMenu;
	}

    public function getNavbar($data)
	{
        $collect  	= collect($data); 
        // $valueCollect = json_decode(json_encode($collect), true);
        
        // print_r($collect->where('menu_level',1)->where('menu_navbar',1)->all()); exit;
		$menuNavbar = $collect->where('menu_level',1)->where('menu_navbar',1)->all();
		$htmlNavbar = '';
        $valueCollect = json_decode(json_encode($menuNavbar), true);

		foreach ($valueCollect as $keyNavbars => $valueCollects) {
            // print_r($valueCollects); exit;
            
			$menuIcon = ($valueCollects['menu_icon'] !='') ? "<span class=\"menu-icon\"><i class=\"{$valueCollect['menu_icon']}\"></i></span>" : "";
			if ($valueCollects['menu_hassub'] == 1) {
				$htmlNavbar .= "
					<div data-kt-menu-trigger=\"click\" data-kt-menu-placement=\"bottom-start\" class=\"menu-item menu-lg-down-accordion me-lg-1\">
						<span class=\"menu-link py-3\">
							{$menuIcon}
							<span class=\"menu-title\">{$valueCollects['menu_title']}</span>
							<span class=\"menu-arrow d-lg-none\"></span>
						</span>
						<div class=\"menu-sub menu-sub-lg-down-accordion menu-sub-lg-dropdown menu-rounded-0 py-lg-4 w-lg-225px\"> ";
							foreach ($collect->where('menu_level',2)->where('menu_parent', $valueCollects['menu_id'])->all() as $keySub => $valueSub) {
                                $valueSub1 = json_decode(json_encode($valueSub), true);


								$iconSub = ($valueSub1['menu_icon']) ? "<span class=\"menu-icon\"><i class=\"{$valueSub1['menu_icon']}\"></i></span>" : "";
								if ($valueSub1['menu_hassub'] == 1) {
									$htmlNavbar .= "<div data-kt-menu-trigger=\"{default:'click', lg: 'hover'}\" data-kt-menu-placement=\"right-start\" class=\"menu-item menu-lg-down-accordion\">
										<span class=\"menu-link py-3\">
											{$iconSub}
											<span class=\"menu-title\">{$valueSub1['menu_title']}</span>
											<span class=\"menu-arrow\"></span>
										</span>
										<div class=\"menu-sub menu-sub-lg-down-accordion menu-sub-lg-dropdown menu-active-bg py-lg-4 w-lg-225px\">";
											foreach ($collect->where('menu_level',3)->where('menu_parent',$valueSub1['menu_id'])->all() as $keySub3 => $valueSub3) {
                                                $valueSub11 = json_decode(json_encode($valueSub3), true);

												// <div class=\"menu-item\">
												// 	<a class=\"menu-link py-3\" href=\"javascript:;\" data-con=\"{$valueSub11['menu_id']}\" onclick=\"HELPER.loadPage(this)\">
												// 		<span class=\"menu-bullet\">
												// 			<span class=\"bullet bullet-dot\"></span>
												// 		</span>
												// 		<span class=\"menu-title\">{$valueSub11['menu_title']}</span>
												// 	</a>
												// </div>
												$htmlNavbar .= "
													<div class=\"menu-item\">
														<a class=\"menu-link py-3\" href=\"{$valueSub11['menu_url']}\" data-con=\"{$valueSub11['menu_id']}\">
															<span class=\"menu-bullet\">
																<span class=\"bullet bullet-dot\"></span>
															</span>
															<span class=\"menu-title\">{$valueSub11['menu_title']}</span>
														</a>
													</div>
												";
											}
										$htmlNavbar .= "</div>
									</div>";
								}else{									
									// <div class=\"menu-item\">
									// 	<a class=\"menu-link py-3\" href=\"javascript:;\" data-con=\"{$valueSub1['menu_id']}\" onclick=\"HELPER.loadPage(this)\" title=\"{$valueSub1['menu_description']}\" data-bs-toggle=\"tooltip\" data-bs-trigger=\"hover\" data-bs-dismiss=\"click\" data-bs-placement=\"right\">
									// 		{$iconSub}
									// 		<span class=\"menu-title\">{$valueSub1['menu_title']}</span>
									// 	</a>
									// </div>
									$htmlNavbar .= "
										<div class=\"menu-item\">
											<a class=\"menu-link py-3\" href=\"{$valueSub1['menu_url']}\" data-con=\"{$valueSub1['menu_id']}\" title=\"{$valueSub1['menu_description']}\" data-bs-toggle=\"tooltip\" data-bs-trigger=\"hover\" data-bs-dismiss=\"click\" data-bs-placement=\"right\">
												{$iconSub}
												<span class=\"menu-title\">{$valueSub1['menu_title']}</span>
											</a>
										</div>
									";
								}
							}
						$htmlNavbar .="</div>
					</div>
				";
			}else{
				$htmlNavbar .= "
					<div class=\"menu-item me-lg-1\">
						<a class=\"menu-link py-3\" href=\"javascript:;\" data-con=\"{$valueCollects['menu_id']}\" onclick=\"HELPER.loadPage(this)\">
							{$menuIcon}
							<span class=\"menu-title\">{$valueCollects['menu_title']}</span>
						</a>
					</div>
				";
			}
		}

		return $htmlNavbar;
	}

	public function getSidebar($data='')
	{
		$collect = collect($data);
		$html = '';
		$menuNavbar = $collect->where('menu_level', 1)->where('menu_navbar', 0)->all();
        $valueCollect = json_decode(json_encode($menuNavbar), true);

		foreach ($valueCollect as $key => $value) {
			$valueCollect = json_decode(json_encode($value), true);

			$menuIcon = ($valueCollect['menu_icon'] !='') ? "<span class=\"menu-icon\"><i class=\"{$valueCollect['menu_icon']}\"></i></span>" : "";
			if ($valueCollect['menu_hassub'] == 1) {

				$html .= "
					<div data-kt-menu-trigger=\"click\" class=\"menu-item menu-accordion\">
						<span class=\"menu-link\">
							{$menuIcon}
							<span class=\"menu-title text-white\">{$valueCollect['menu_title']}</span>
							<span class=\"menu-arrow\"></span>
						</span>
						<div class=\"menu-sub menu-sub-accordion menu-active-bg\">";
						// print_r($collect->where('menu_level',2)->where('menu_parent',$valueCollect['menu_id'])->all());
							foreach ($collect->where('menu_level',2)->where('menu_parent',$valueCollect['menu_id'])->all() as $keySub => $valueSub) {
                            $valueCollect1 = json_decode(json_encode($valueSub), true);

								$html .= "
									<div class=\"menu-item\">
										<a class=\"menu-link\" href=\"javascript:;\" data-con=\"{$valueCollect1['menu_id']}\" onclick=\"HELPER.loadPage(this)\">
											<span class=\"menu-bullet\">
												<span class=\"bullet bullet-dot\"></span>
											</span>
											<span class=\"menu-title text-white\">{$valueCollect1['menu_title']}</span>
										</a>
									</div>
								";
							}
						$html .= "</div>
					</div>
				";
			}else{
				$html .= "
					<div class=\"menu-item\">
						<a class=\"menu-link\" href=\"javascript:;\" data-con=\"{$valueCollect['menu_id']}\" onclick=\"HELPER.loadPage(this)\">
							{$menuIcon}
							<span class=\"menu-title text-white\">{$valueCollect['menu_title']}</span>
						</a>
					</div>
				";
			}
		}

		return $html;
	}
}
