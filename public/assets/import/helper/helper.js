var HELPER = function () {
    var menuid = null;
    var role_access = [];
    var response__ = [];

    var loadBlock = function (message) {
        $.blockUI({ 
            message: '<div class="lds-ring" style="z-index: 9999"><div></div><div></div><div></div><div>' ,
            css: {border: 'none', backgroundColor: 'rgba(47, 53, 59, 0)', 'z-index': 9999999}
        });
    }

    var unblock = function (delay) {
        window.setTimeout(function () {
            $.unblockUI();
        }, delay);
    }

    var html_entity_decode = function (txt) {
        var randomID = Math.floor((Math.random() * 100000) + 1);
        $('body').append('<div id="random' + randomID + '"></div>');
        $('#random' + randomID).html(txt);
        var entity_decoded = $('#random' + randomID).html();
        $('#random' + randomID).remove();
        return entity_decoded;
    }

    var configDT = {};
    var datagDefaultDT = {};

    return {
        getMenuId: function () {
            return menuid;
        },
        block: function (msg) {
            loadBlock(msg);
        },
        unblock: function (delay) {
            unblock(delay);
        },
        toRp: function (angka, num = false) {
            if (angka == "" || angka == 'undefined' || angka == null) {
                angka = 0;
            }
            var rev = parseInt(angka, 10).toString().split('').reverse().join('');
            var rev2 = '';
            var zero = num ? ',00' : '';
            for (var i = 0; i < rev.length; i++) {
                rev2 += rev[i];
                if ((i + 1) % 3 === 0 && i !== (rev.length - 1)) {
                    rev2 += '.';
                }
            }
            return '' + rev2.split('').reverse().join('') + zero;
        },
        logout: function () {
            $.ajax({
                url: APP_URL + 'login/logout',
                data: {
                    system_csrf_aps_dev: $.cookie('system_csrf_aps_dev'),
                    token: FCM.getMyToken()
                },
                type: 'POST',
                complete: function (response) {
                    window.location.reload();
                }
            })
        },
        html_entity_decode: function (txt) {
            html_entity_decode(txt);
        },
        decodeEntity: function (str) {
            return $("<textarea></textarea>").html(str).text();
        },
        getCookie: function (cname) {
            var name = cname + "=";
            var ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') c = c.substring(1);
                if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
            }
            return "";
        },
        nullConverter: function (val, xval) {
            var retval = val;
            if (val === null || val === '' || typeof val == 'undefined') {
                retval = (typeof xval != 'undefined') ? xval : "-";
            }
            return retval;
        },

        getPage: function (config) {
            config = $.extend(true, {
                url: '',
                data: '',
            }, config);

            return new Promise(function (resolve, reject) {
                HELPER.ajax({
                    url: config.url,
                    data: config.data,
                    complete: function (response) {
                        resolve(response)
                    }, error: function (response) {
                        reject(response)
                    }
                });
            })
        },

        checkPageLogin: function (isLogin) {
            if (!isLogin) window.location.reload();
        },

        pushContent: function (response) {
            // $("#pagecontainer").css('visibility','hidden');
            $("#pagecontainer").html('').html(atob(response.view));
            $('#page-title').html(`<h1> ${response.role_name} - ${response.menu_title}</h1>`);
            $('#box-title').html(`Table ${response.menu_title}`);
            $('#form-title').html(`Form ${response.menu_title}`);
            $('#pagesubtitle').html(response.menu_keterangan);
        },

        pushRoleContent: function (response) {
            var container = $("#pagecontainer");
            role_access = [];
            if (response.rights.length > 0) {
                $.each(response.rights, function (i, v) {
                    role_access.push(v.menu_kode)
                    var role_object = $(`[data-role="${v.menu_kode}"]`, container);
                    if ($(role_object).data('roleable')) {
                        $(role_object).addClass('aman');
                    }
                });
                $.each($('[data-roleable="true"]', container), function (i, v) {
                    if (!$(v).hasClass('aman')) {
                        if ($(v).data('tab')) {
                            window.li = $(v)[0];
                            if (li) {
                                $(li.nextElementSibling).find('a').trigger('click');
                            }
                        }
                        $(v).remove();
                    } else {
                        $(v).removeClass('aman');
                    }
                })
            } else {
                $('[data-roleable="true"]').remove();
            }
            // if collapsed table
            if (container.find('table.dt-head-left.collapsed').length > 0) {
            }
        },

        doneContent: function (el) {
            $("#pagecontainer").css('visibility', 'visible');
            $('.disable').attr('disabled', true);

            $('html,body').animate({
                scrollTop: 0
            }, 'fast');

            $(".menu_parent").each(function (i, v) {
                $(v).removeClass('kt-menu__item--active');
            });
            $('li').removeClass('kt-menu__item--active');
            $('li').removeClass('kt-menu__item--here');
            $(el).parent().addClass('kt-menu__item--active');
            $(el).parent().addClass('menu-open');
            $(el).parents('.kt-menu__item--open').addClass('kt-menu__item--here menu-open');
            $('.kt-menu__item--open').not('.kt-menu__item--here').removeClass('kt-menu__item--open')
        },

        getCountdown: function() {
            // // to dashboard
            // $(`[data-con="d5f82f50811f7ace9ad1dd8a691951b3"]`).trigger('click');
            HELPER.ajax({
                url: APP_URL+ "main/getCountdown",
                success: (response) => {
                    if (response.success === true) {
                        //D-day
                        var dday =response.pemilu
                        // Set the date we're counting down to
                        var countDownDate = new Date(dday).getTime();
                        // Update the count down every 1 second
                        var x = setInterval(function() {                            
                            // Get today's date and time
                            var now = new Date().getTime();
                            
                            // Find the distance between now and the count down date
                            var distance = countDownDate - now;
                            // Time calculations for days, hours, minutes and seconds
                            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
                            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                            var seconds = Math.floor((distance % (1000 * 60)) / 1000);

                            var column1 = '';
                            var column2 = '';
                            var column3 = '';
                            var title1 = 'Hari';
                            var title2 = 'Jam';
                            var title3 = 'Menit';
                            var color = 'text-aps';
                            if (days > 0) {
                                var stringDays = days.toString();
                                var stringHours = hours.toString();
                                var stringMinutes = minutes.toString();
                                color = (days <= 7)? 'text-warning':color;
                                if (stringDays.length > 1) {
                                    $.each(stringDays.split(''), (i,v) => {
                                        column1 += `<span class="label label-rounded font-weight-bold font-size-h3 py-5 px-2" style="margin: 0 2px!important;">${v}</span>`;
                                    });
                                } else {
                                    column1 += `
                                        <span class="label label-rounded font-weight-bold font-size-h3 py-5 px-2" style="margin: 0 2px!important;">0</span>
                                        <span class="label label-rounded font-weight-bold font-size-h3 py-5 px-2" style="margin: 0 2px!important;">${stringDays}</span>
                                    `;
                                }
                                column2 = (stringHours.length > 1)? '':`<span class="label label-rounded font-weight-bold font-size-h3 py-5 px-2" style="margin: 0 2px!important;">0</span>`;
                                $.each(stringHours.split(''), (i,v) => {
                                    column2 += `<span class="label label-rounded font-weight-bold font-size-h3 py-5 px-2" style="margin: 0 2px!important;">${v}</span>`;
                                });
                                column3 = (stringMinutes.length > 1)? '':`<span class="label label-rounded font-weight-bold font-size-h3 py-5 px-2" style="margin: 0 2px!important;">0</span>`;
                                $.each(stringMinutes.split(''), (i,v) => {
                                    column3 += `<span class="label label-rounded font-weight-bold font-size-h3 py-5 px-2" style="margin: 0 2px!important;">${v}</span>`;
                                });
                            } else {
                                var stringHours = hours.toString();
                                var stringMinutes = minutes.toString();
                                var stringSeconds = seconds.toString();
                                var title1 = 'Jam';
                                var title2 = 'Menit';
                                var title3 = 'Detik';
                                color = 'text-danger';
                                column1 = (stringHours.length > 1)? '':`<span class="label label-rounded font-weight-bold font-size-h3 py-5 px-2" style="margin: 0 2px!important;">0</span>`;
                                $.each(stringHours.split(''), (i,v) => {
                                    column1 += `<span class="label label-rounded font-weight-bold font-size-h3 py-5 px-2" style="margin: 0 2px!important;">${v}</span>`;
                                });
                                column2 = (stringMinutes.length > 1)? '':`<span class="label label-rounded font-weight-bold font-size-h3 py-5 px-2" style="margin: 0 2px!important;">0</span>`;
                                $.each(stringMinutes.split(''), (i,v) => {
                                    column2 += `<span class="label label-rounded font-weight-bold font-size-h3 py-5 px-2" style="margin: 0 2px!important;">${v}</span>`;
                                });
                                column3 = (stringSeconds.length > 1)? '':`<span class="label label-rounded font-weight-bold font-size-h3 py-5 px-2" style="margin: 0 2px!important;">0</span>`;
                                $.each(stringSeconds.split(''), (i,v) => {
                                    column3 += `<span class="label label-rounded font-weight-bold font-size-h3 py-5 px-2" style="margin: 0 2px!important;">${v}</span>`;
                                });
                            }
                            
                            var html = `
                                <div class="row d-flex justify-content-center">
                                    <span class="font-weight-bolder" style="font-size: 15px;">Countdown</span>
                                </div>
                                <div class="row d-flex justify-content-center">
                                    <div>
                                        <div class="row">
                                            ${column1}
                                        </div>
                                        <div class="row d-flex justify-content-center font-weight-bold ${color}">${title1}</div>
                                    </div>
                                    <div class="font-weight-bold font-size-h3 my-1 mx-5"> : </div>
                                    <div>
                                        <div class="row">
                                            ${column2}
                                        </div>
                                        <div class="row d-flex justify-content-center font-weight-bold ${color}">${title2}</div>
                                    </div>
                                    <div class="font-weight-bold font-size-h3 my-1 mx-5"> : </div>
                                    <div>
                                        <div class="row">
                                            ${column3}
                                        </div>
                                        <div class="row d-flex justify-content-center font-weight-bold ${color}">${title3}</div>
                                    </div>
                                </div>
                            `;

                            // Display the result in the element with id="demo"
                            $(`#countDownPemilu`).html(html);

                            // If the count down is finished, write some text
                            if (distance < 0) {
                                clearInterval(x);
                                var html = `
                                    <div class="row d-flex justify-content-center font-size-h3 font-weight-bold text-danger">
                                        ${response.headline}
                                    </div>
                                `;
                                $(`#countDownPemilu`).html(html);
                            }
                        }, 1000);
                    } else {
                        var html = `
                            <a href="javascript:void(0)" onclick="HELPER.loadPage(this)" data-con="c0779dd04b19f9e5e8016277d923bc86">
                                <i class="row d-flex justify-content-center font-weight-bold text-danger">Tanggal Pemilu Belum Dipilih</i>
                            </a>
                        `;
                        $(`#countDownPemilu`).html(html);
                    }
                }
            });
        },

        loadPage: async function (el, popstate = false) {
            loadBlock();
            // empty config datatable
            configDT = {};
            configDefaultDT = {};

            $('li').removeClass('menu-item-active');

            $(window).unbind('scroll');
            $('li.kt-menu__item').removeClass('kt-menu__item--active');
            var page = $(el).data();

            if (typeof page.content != 'undefined' && page.content != '') {
                $(el).parent().parent().attr('style', '');
                page['con'] = page.menu;
                localStorage.setItem("content_id", page.content);
            }
            else {
                localStorage.removeItem("content_id");
            }

            menuid = page.con;
            page['system_csrf_aps_dev'] = $.cookie('system_csrf_aps_dev');

            var response = await HELPER.getPage({ url: APP_URL + "main/getPage", data: page });
            var login = await HELPER.checkPageLogin(response.isLogin);
            var content = await HELPER.pushContent(response);
            var dole = await HELPER.doneContent(el);
            response__ = response;
            var role = await HELPER.pushRoleContent(response);

            $('#menus_breadcrumb').html(response.breadcrumb);
            $('#menus_title').html(response.menu_title);
            $('.total_notif').html(0).html(response.new_total_notif);

            if (!$($($($($(el).parent()).parent()).parent()).parent()).hasClass('menu-item-open')) {
                $('.menu-item.menu-item-submenu').removeClass('menu-item-open');
            }

            $.each(response.active, function(i,v) {
                $($(`[data-con="${v}"]`).parent()).addClass('menu-item-active');
            });
        },

        get_role_access: function (name = null) {
            if (name) {
                if (role_access) {
                    return role_access.includes(name);
                }
                return false;
            }
            return role_access;
        },

        set_role_access: function (data = []) {
            role_access = data;
        },

        aksi: function (config) {
            if (config.length > 0) {
                var actionBtn = "";
                $.each(config, (i,v) => {
                    var setDisabled = (!typeof v.disabled != 'undefined' && v.disabled)? 'disabled':'';
                    if (role_access.includes(v.role)) {
                        actionBtn += `
                            <a href="javascript:;" onclick="${v.action}" data-roleable="${v.roleable}" data-role="${v.role}" class="btn btn-xs btn-icon btn-bg-light btn-icon-${v.color} btn-hover-${v.color} ${setDisabled}" data-toggle="tooltip" title="${v.title}">
                                <i class="${v.icon}"></i>
                            </a>
                        `;
                    }
                });
                
                return actionBtn;
            } else {
                if (!role_access.includes(config.role)) return "";
                var setDisabled = (!typeof config.disabled != 'undefined' && config.disabled)? 'disabled':'';
                return `
                    <a href="javascript:;" onclick="${config.action}" data-roleable="${config.roleable}" data-role="${config.role}" class="btn btn-xs btn-icon btn-bg-light btn-icon-${v.color} btn-hover-${config.color} ${setDisabled}" data-toggle="tooltip" title="${config.title}">
                        <i class="${config.icon}"></i>
                    </a>
                `;
            }
        },

        initTable: function (config) {
            config = $.extend(true, {
                el: '',
                multiple: false,
                sorting: 'asc',
                index: 1,
                force: false,
                parentCheck: 'checkAll',
                childCheck: 'checkbox',
                searchAble: false,
                scrollAble: false,
                scrollYAble: false,
                clickAble: false,
                checkboxAble: false,
                destroyAble: false,
                tabDetails: false,
                showCheckbox: false,
                responsive: false,
                pageLength: 10,
                mouseover: false,
                addFilter: {
                    isset: false,
                    reset: true,
                    title: ''
                },
                addButton: {
                    isset: true,
                    title: 'Tambah',
                    roleable: false,
                    role: '',
                    icon: `
                        <span class="svg-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                    <rect x="0" y="0" width="24" height="24" />
                                    <circle fill="#ffffff" opacity="0.3" cx="12" cy="12" r="10" />
                                    <path d="M11,11 L11,7 C11,6.44771525 11.4477153,6 12,6 C12.5522847,6 13,6.44771525 13,7 L13,11 L17,11 C17.5522847,11 18,11.4477153 18,12 C18,12.5522847 17.5522847,13 17,13 L13,13 L13,17 C13,17.5522847 12.5522847,18 12,18 C11.4477153,18 11,17.5522847 11,17 L11,13 L7,13 C6.44771525,13 6,12.5522847 6,12 C6,11.4477153 6.44771525,11 7,11 L11,11 Z" fill="#ffffff" />
                                </g>
                            </svg>
                        </span>
                    `
                },
                data: {
                    system_csrf_aps_dev: $.cookie('system_csrf_aps_dev')
                },
                filterColumn: {
                    state: true,
                    exceptionIndex: []
                },
                columnDefs: [],
                callbackClick: function () { },
            }, config);

            if (config.el != '') {
                // create add button
                var searchWidth = 'col-md-12 col-lg-12 col-sm-12';
                var addButton = ''
                var addDropdownBtn = [];
                if (config.addButton.isset) {
                    searchWidth = 'col-md-8 col-lg-8 col-sm-12';
                    if (config.addButton.dropdownexist) {
                        addDropdownBtn = config.addButton.dropdownexistView;
                    } else {
                        // creating dropdon button if exist
                        var aToolbarItems = $($(`.table_data`).find('.card-toolbar')).find('a.btn');
                        var btnToolbarItems = $($(`.table_data`).find('.card-toolbar')).find('button.btn');
                        if (aToolbarItems.length > 0) {
                            $.each(aToolbarItems, function(i, v) {
                                var attrBtn = v.getAttributeNames();
                                var attrValBtn = v.getAttributeNames().map(name => v.getAttribute(name));
                                var newAttr = '';
                                $.each(attrBtn, function(iAttr, vAttr) {
                                    newAttr += ` ${vAttr}="${attrValBtn[iAttr]}" `;
                                })
                                addDropdownBtn.push([`<a class="dropdown-item" ${newAttr}>${$(v).html()}</a>`]);
                            });
                        }
                        if (btnToolbarItems.length > 0) {
                            $.each(btnToolbarItems, function(i, v) {
                                var attrBtn = v.getAttributeNames();
                                var attrValBtn = v.getAttributeNames().map(name => v.getAttribute(name));
                                var newAttr = '';
                                $.each(attrBtn, function(iAttr, vAttr) {
                                    newAttr += ` ${vAttr}="${attrValBtn[iAttr]}" `;
                                })
                                addDropdownBtn.push([`<a class="dropdown-item" ${newAttr}>${$(v).html()}</a>`]);
                            });
                        }

                        config.addButton.dropdownexist = true;
                        config.addButton.dropdownexistView = addDropdownBtn;
                    }
                    
                    var filterAddbtn = true;
                    if (config.addButton.roleable) {
                        if (!role_access.includes(config.addButton.role)) {
                            filterAddbtn = false;
                            searchWidth = 'col-md-12 col-lg-12 col-sm-12';
                        }
                    }

                    if (filterAddbtn) {   
                        addButton += `<div class="col-lg-4 mx-0 px-1">`;
                        if (addDropdownBtn.length > 0) {
                            addButton += `
                                <div class="btn-group" data-roleable="${config.addButton.roleable}" data-role="${config.addButton.role}">
                                    <button type="button" onclick="onAdd()" class="btn btn-aps font-weight-bolder btn-sm" style="white-space: nowrap;">
                                        ${config.addButton.icon}
                                        ${config.addButton.title}
                                    </button>
                                    <button type="button" class="btn btn-sm btn-aps dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <span class="sr-only">Toggle Dropdown</span>
                                    </button>
                                    <div class="dropdown-menu ${config.el}_dropdown-menu" style=""></div>
                                </div>
                            `;
                        } else {
                            addButton += `
                                <a href="javascript:;" onclick="onAdd(this)" data-roleable="${config.addButton.roleable}" data-role="${config.addButton.role}" class="btn btn-aps font-weight-bolder btn-sm mr-2" style="white-space: nowrap;">
                                    ${config.addButton.icon}
                                    ${config.addButton.title}
                                </a>
                            `;
                        }
                        addButton += `</div>`
                    }
                }
                
                if (config.searchAble) {
                    // create additional filter button
                    var addFilter = '';
                    var titleCard = $($(`.table_data`).find('.card-label')).html();
                    if (config.addFilter.isset) {
                        var filterTitle = (config.addFilter.tittle != '')? titleCard:config.addFilter.tittle;
                        addFilter = `
                            <div class="input-group-append">
                                <button type="button" class="btn btn-sm btn-light-aps d-flex justify-content-center" data-toggle="modal" data-target="#${config.el}_id-modal">
                                    <span class="svg-icon mr-0">
                                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                <rect x="0" y="0" width="24" height="24" />
                                                <path d="M5,4 L19,4 C19.2761424,4 19.5,4.22385763 19.5,4.5 C19.5,4.60818511 19.4649111,4.71345191 19.4,4.8 L14,12 L14,20.190983 C14,20.4671254 13.7761424,20.690983 13.5,20.690983 C13.4223775,20.690983 13.3458209,20.6729105 13.2763932,20.6381966 L10,19 L10,12 L4.6,4.8 C4.43431458,4.5790861 4.4790861,4.26568542 4.7,4.1 C4.78654809,4.03508894 4.89181489,4 5,4 Z" fill="#ffffff" />
                                            </g>
                                        </svg>
                                    </span>
                                </button>
                            </div>
                        `;

                        // flagging from filter
                        config.fromFilter = true;
                        var filterConfig = btoa(JSON.stringify(config));
                        if (jQuery.isEmptyObject(configDT)) {
                            configDT = config;
                        }
                        var resetBtn = '';
                        if (config.addFilter.reset) {
                            resetBtn = `
                                <button type="reset" onclick="HELPER.onResetFilter('${filterConfig}');" class="btn btn-sm btn-light-aps font-weight-bold ${config.el}_btn-reset-filter" style="display: none;">
                                    Reset Filter
                                </button>
                            `;
                        }
                        var modalFilter = `
                            <div class="modal fade" id="${config.el}_id-modal" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="staticBackdrop" aria-hidden="true">
                                <div class="modal-dialog modal-dialog-centered" role="document">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="${config.el}_id-modalLabel">Filter ${filterTitle}</h5>
                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                <i aria-hidden="true" class="ki ki-close"></i>
                                            </button>
                                        </div>
                                        <form action="javascript:HELPER.onFilterDT('${filterConfig}');" name="${config.el}-filterDT_form">
                                            <div class="modal-body">
                                            </div>
                                            <div class="modal-footer">
                                                ${resetBtn}
                                                <button type="submit" class="btn btn-sm btn-aps font-weight-bold">Apply</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        `;
                        // push modal to card
                        $(`.table_data`).append(modalFilter);

                        // push modal content into modal filter
                        var contenModal = $(`.filter_data`).html();
                            $($(`#${config.el}_id-modal`).find('.modal-body')).html(contenModal);
                    }
                    
                    var cardFilter = `
                        <div class="form-group row mb-0">
                            <div class="${searchWidth} px-1">
                                <div class="input-group input-group-sm input-group-solid">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text">
                                            <i class="la la-search"></i>
                                        </span>
                                    </div>
                                    <input type="search" class="form-control form-control-sm" id="${config.el}_dtSearch" placeholder="Search ${titleCard}" aria-controls="provinsi-table">
                                    ${addFilter}
                                </div>
                            </div>
                            ${addButton}
                        </div>
                    `;

                    $($(`.table_data`).find('.card-toolbar')).html(cardFilter);
                    // append dropdown menu add
                    if (addDropdownBtn.length > 0) {
                        $(`.${config.el}_dropdown-menu`).html(addDropdownBtn.join(''));
                    }                   
                }
            }

            // set column def and complete function
            if  (!jQuery.isEmptyObject(configDT)) {
                config.columnDefs = configDT.columnDefs;
                config.fnRowCallback = configDT.fnRowCallback;
                config.fnInitComplete = configDT.fnInitComplete;
            } else {
                config.fnInitComplete = function (oSettings, data) {
                    HELPER.unblock(500);
                };
            }
            var xdefault =
            {
                //== Pagination settings
                // read more: https://datatables.net/examples/basic_init/dom.html
                dom: `<'row'<'col-sm-12'ftr>><'row'lp<'dataTables_pager'i>>`,
                destroy: config.destroyAble,
                lengthMenu: [5, 10, 25, 50, 100],
                pageLength: config.pageLength,
                language: {
                    'lengthMenu': 'Display _MENU_  records per page',
                    "emptyTable": "No records available",
                    "info": "Showing page _PAGE_ of _PAGES_",
                    "infoEmpty": "No records available",
                    "infoFiltered": "(Filtered from _MAX_ total records)",
                    "search": "Search:",
                    "zeroRecords": "Nothing found - sorry",
                    "processing": "Loading...",
                },
                searchDelay: 1000,
                processing: true,
                serverSide: true,
                columnDefs: config.columnDefs,
                ajax: {
                    url: config.url,
                    type: 'POST',
                    data: function (d) {
                        d.system_csrf_aps_dev = $.cookie('system_csrf_aps_dev');
                        d.data = config.data;
                    }
                },
                //== Order settings
                order: [[config.index, config.sorting]],
                fnDrawCallback: function (oSettings) {
                    if (config.clickAble) {
                        $('thead').find('th').css({ 'text-align': 'center' });
                        $("#" + config.el + " tbody").off('click');
                        if (config.multiple === false) {
                            $('tbody').find('tr').each(function (i, v) {
                                $('td:eq(0)', v).css({ 'text-align': 'center' });
                                $(v).addClass('clickable');
                            })
                            $('.row_selected').removeClass('row_selected');
                            $("#" + config.el + " tr").css('cursor', 'pointer');
                            $("#" + config.el + " tbody tr").each(function (i, v) {
                                if (config.showCheckbox == true) {
                                    $('input[name=checkbox]', v).removeClass('d-none').addClass('d-block');
                                }
                                $(v).on('click', function () {
                                    if (oSettings.aoData.length > 0) {
                                        $(v).addClass('row_selected');
                                        if ($(this).hasClass('selected')) {
                                            $(v).removeClass('selected');
                                            $(v).removeAttr('checked');
                                            $('input[name=checkbox]', v).prop('checked', false);
                                            $('.disable').attr('disabled', true);
                                            $('.row_selected').removeClass('row_selected');
                                        } else {
                                            $(".checkbox").removeAttr('checked');
                                            $(".selected").removeClass('selected');
                                            $('#' + config.el + '.dataTable tbody tr.selected').removeClass('selected');
                                            $(v).addClass('selected');
                                            $('.row_selected').removeClass('row_selected');
                                            $(v).addClass('row_selected');
                                            $('input[name=checkbox]', v).prop('checked', true);
                                            $('.disable').attr('disabled', false);
                                        }
                                    }
                                });
                            });
                        } else {
                            $('tbody').find('tr').each(function (i, v) {
                                $(v).addClass('clickable');
                            })
                            var cnt = 0;
                            $("#" + config.el + " tr").css('cursor', 'pointer');
                            $("#" + config.el + " tbody tr").each(function (i, v) {
                                if (config.showCheckbox == true) {
                                    $('input[name=checkbox]', v).removeClass('d-none').addClass('d-block');
                                }
                                $(v).on('click', function () {
                                    var run = config.callbackClick(this);
                                    if ($(this).hasClass('selected')) {
                                        --cnt;
                                        $(v).removeClass('selected');
                                        $(v).removeAttr('checked');
                                        $('input[name=checkbox]', v).prop('checked', false);
                                        $(v).removeClass('row_selected');
                                    } else {
                                        ++cnt;
                                        $('input[name=checkbox]', v).prop('checked', true);
                                        $(v).addClass('selected');
                                        $(v).addClass('row_selected');
                                    }

                                    if (cnt > 0) {
                                        $('.disable').attr('disabled', false);
                                    } else {
                                        $('.disable').attr('disabled', true);
                                    }
                                });
                            });

                            $('.' + config.parentCheck).click(function (event) {
                                if (this.checked) {
                                    $('.' + config.childCheck).each(function () {
                                        this.checked = true;
                                        $("#" + config.el + " tbody tr").each(function (i, v) {
                                            $(v).addClass('selected');
                                            $(v).addClass('row_selected');
                                        });
                                    });
                                    $('.' + config.parentCheck).addClass('selected');
                                    $('.disable').attr('disabled', false);
                                } else {
                                    $('.' + config.childCheck).each(function () {
                                        this.checked = false;
                                        $("#" + config.el + " tbody tr").each(function (i, v) {
                                            $(v).removeClass('row_selected');
                                            $(v).removeClass('selected');
                                            $(v).removeAttr('checked');
                                        });
                                    });
                                    $('.disable').attr('disabled', true);
                                }
                            });

                            $('th').click(function (i, v) {
                                if ($(this).hasClass('sorting_disabled')) { } else {
                                    $("#" + config.el + " tbody tr").each(function (i2, v2) {
                                        $(v2).removeClass('row_selected');
                                        $(v2).removeClass('selected');
                                        $(v2).removeAttr('checked');
                                    });
                                    $('.' + config.parentCheck).removeClass('selected');
                                    $('.' + config.parentCheck).prop('checked', false);
                                }
                            })
                        }
                    }

                    /*if (config.mouseover) {
                        $('#'+config.el+' tbody tr').mouseover(function () {
                            var offset = $(this).offset();
                            var id = $('#'+config.el).DataTable().row( this ).data().rowData.id;
                            $('#button-action a').data('id',id);
                            $('#button-action').css({
                                'top': offset.top - 78,
                                'left': '90%'
                            }).fadeIn();
                        }).mouseout(function() {
                            $('#button-action').fadeIn(function(){});
                        });
                    }*/

                },
                fnRowCallback: config.fnRowCallback,
                fnInitComplete: config.fnInitComplete,
                headerCallback: function (thead, data, start, end, display) {
                    if (config.checkboxAble) {
                        thead.getElementsByTagName('th')[0].innerHTML = '\
                            <label class="m-checkbox m-checkbox--single m-checkbox--solid m-checkbox--brand">\
                                <input type="checkbox" value="" class="m-group-checkable">\
                                <span></span>\
                            </label>';
                    }
                },
            };
            // if (typeof config.columnDefs != 'undefined') {
            //     config.columnDefs.push({ defaultContent: "-", targets: "_all" }, { targets: 0, searchable: false, orderable: false });
            // }

            // // var search_able=``;
            // if (!config.searchAble) {
            //     xdefault.dom = `<'row'<'col-sm-12'tr>>
            //     <'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7 dataTables_pager'lp>>`;
            // }

            if (config.scrollAble) {
                xdefault.scrollX = true;
                xdefault.scrollCollapse = true;
            } else {
                xdefault.responsive = config.responsive;
            }
            if (config.scrollYAble) {
                xdefault.scrollY = '50vh';
                xdefault.scrollCollapse = true;
                xdefault.paging = false;
            } else {
                xdefault.responsive = config.responsive;
            }


            /*add input filter column*/
            // if (config.filterColumn.state) {
            //     $("#" + config.el+ ' tfoot').remove();
            //     $("#" + config.el).append('<tfoot>'+$("#" + config.el+' thead').html()+'</tfoot>');                                
            //}            

            var el = $("#" + config.el);
            if (!config.force) {
                var dt = $(el).DataTable($.extend(true, xdefault, config));
            } else {
                var dt = $(el).KTDatatable(config);
            }

            if (typeof config.multiple !== 'undefined' && config.multiple === true) {
                //checkbox checked all
                var dt = $('#' + config.el).DataTable().on('change', '.m-group-checkable', function () {
                    var set = $(this).closest('table').find('td:first-child .m-checkable');
                    var checked = $(this).is(':checked');
    
                    $(set).each(function () {
                        if (checked) {
                            $(this).prop('checked', true);
                            $(this).closest('tr').addClass('active');
                        }
                        else {
                            $(this).prop('checked', false);
                            $(this).closest('tr').removeClass('active');
                        }
                    });
                });
            }

            if (config.searchAble) {                
                //searchbox
                $(`#${config.el}_dtSearch`).off('keyup').on('keyup', function () {
                    dt.search(this.value).draw();
                });
            }

            // //tabDetails
            // // Add event listener for opening and closing details
            // if (config.tabDetails) {
            //     $('#' + config.el + ' tbody').off('click');
            //     $('#' + config.el + ' tbody').on('click', 'td.details-control', function () {
            //         HELPER.block(0);
            //         var tr = $(this).closest('tr');
            //         var row = $("#" + config.el).DataTable().row(tr);
            //         // var xdata = $.parseJSON(atob($($(full[0])[2]).data('record')));

            //         if (row.child.isShown()) {
            //             // This row is already open - close it
            //             // console.log('This row is already open - close it');
            //             row.child.hide();
            //             tr.removeClass('shown');
            //         }
            //         else {
            //             // Open this row
            //             // console.log('open this row');
            //             row.child(format(row.data())).show();
            //             tr.addClass('shown');
            //         }
            //         HELPER.unblock(500);
            //     });
            // }

            // Sort by columns 1 and 2 and redraw
            /* table
                .order( [ 1, 'asc' ], [ 2, 'asc' ] )
                .draw();*/

            if (typeof config.fromFilter !== 'undefined' && config.fromFilter === true) {
                    // unblock modal
                HELPER.unblockModal({el: `${config.el}_id-modal`});
                // close modal filter
                $($(`#${config.el}_id-modal.modal`).find('button.close[data-dismiss="modal"][aria-label="Close"]')).trigger('click');
                // show reset button
                if (config.addFilter.isset && config.addFilter.submit){
                    $(`#${config.el}_id-modal .${config.el}_btn-reset-filter`).removeAttr('style');
                } else {
                    $(`#${config.el}_id-modal .${config.el}_btn-reset-filter`).css('display', 'none');
                }
            }


            $(el).addClass('table-condensed').removeClass('table-striped').addClass('compact nowrap hover dt-head-left');
            $(`.dataTables_length`).addClass('col-md-4 col-sm-12');
            $(`.dataTables_paginate`).addClass('col-md-4 col-sm-12');
            $(`.dataTables_pager`).addClass('col-md-4 col-sm-12');
            $(`.dataTables_info`).addClass(`pt-0`);
            $(`#${config.el}_filter`).remove();

            $.each(role_access, (i,v) => {
                $(`[data-roleable="true"][data-role="${v}"]`).addClass('aman');
            });

            $(`[data-roleable="true"]`).each((i,v) => {
                if (!$(v).hasClass('aman')) {
                    $(v).remove();
                }
            });

            return dt;
        },

        onFilterDT: function(conf) {
            var config = JSON.parse(atob(conf));
            // config.columnDefs = configDT.columnDefs;
            var formData = new FormData($(`[name="${config.el}-filterDT_form"]`)[0]);
            // flagging submit filter
            config.addFilter.submit = true;
            config.data.where = {};
            for (var pair of formData.entries()) {
                var keyEntries = pair[0];
                config.data.where[keyEntries] = pair[1];
            };
            HELPER.blockModal({
                el: `${config.el}_id-modal`,
                state: 'success',
                message: 'Dalam proses...',
                bg: '#000000',
            });
            // load datatable
            HELPER.initTable(config);
        },

        onResetFilter: function(conf) {
            var config = JSON.parse(atob(conf));
            // flagging submit filter
            config.addFilter.submit = false;
            config.data = datagDefaultDT;

            HELPER.blockModal({
                el: `${config.el}_id-modal`,
                state: 'success',
                message: 'Dalam proses...',
                bg: '#000000',
            });
            // load datatable
            HELPER.initTable(config);
        },

        blockModal: function(config) {
            config = $.extend(true, {
                el: null,
                state: 'primary',
                message: 'Processing...',
                bg: '#000000',
            }, config);

            if (config.el == null) return;
            KTApp.block(`#${config.el} .modal-content`, {
                overlayColor: config.bg,
                state: config.state,
                message: config.message,
            });
        },

        unblockModal: function(config) {
            config = $.extend(true, {
                el: null,
                timeout: 500
            }, config);

            if (config.el == null) return;
            setTimeout(function() {
              KTApp.unblock(`#${config.el} .modal-content`);
            }, config.timeout);            
        },

        addRights: function (config) {
            // create right for datatable
            HELPER.pushRoleContent(response__);
        },

        getRowData: function (config) {
            var xdata = $.parseJSON(atob($($(config.data[0])[2]).data('record')));
            return xdata;
        },

        getRowDataMultiple: function (config) {
            var xdata = $.parseJSON(atob($(config.data[0]).data('record')));
            return xdata;
        },

        getRecord: function (el) {
            return JSON.parse(atob($($($(el).parents('tr').children('td')[0]).children('input')).data('record')));
        },

        getRecordChild: function (el) {
            return JSON.parse(atob($($($(el).children('td')[0]).children('input')).data('record')));
        },

        toggleForm: function (config) {
            config = $.extend(true, {
                speed: 'fast',
                easing: 'swing',
                callback: function () { },
                tohide: 'table_data',
                toshow: 'form_data',
                animate: null,
                scrollTop: true
            }, config);


            if (config.animate !== null) {
                if (config.animate === 'toogle') {
                    if (Array.isArray(config.tohide)) {
                        $.each(config.tohide, function (index, valHide) {
                            $("." + valHide).fadeToggle(config.speed, function () {
                                if (Array.isArray(config.toshow)) {
                                    $.each(config.toshow, function (index, valShow) {
                                        $("." + valShow).fadeToggle(config.speed, config.callback)
                                    })
                                } else {
                                    $("." + config.toshow).fadeToggle(config.speed, config.callback)
                                }
                            });
                        })
                    } else {
                        $("." + config.tohide).fadeToggle(config.speed, function () {
                            $("." + config.toshow).fadeToggle(config.speed, config.callback)
                        });

                    }
                }
                else if (config.animate === 'slide') {
                    if (Array.isArray(config.tohide)) {
                        $.each(config.tohide, function (index, valHide) {
                            $("." + valHide).slideUp(config.speed, function () {
                                if (Array.isArray(config.toshow)) {
                                    $.each(config.toshow, function (index, valShow) {
                                        $("." + valShow).slideDown(config.speed, config.callback)
                                    })
                                } else {
                                    $("." + config.toshow).slideDown(config.speed, config.callback)
                                }
                            });
                        })
                    } else {
                        $("." + config.tohide).slideUp(config.speed, function () {
                            $("." + config.toshow).slideDown(config.speed, config.callback)
                        });

                    }
                } else {
                    if (Array.isArray(config.tohide)) {
                        $.each(config.tohide, function (index, valHide) {
                            $("." + valHide).fadeOut(config.speed, function () {
                                if (Array.isArray(config.toshow)) {
                                    $.each(config.toshow, function (index, valShow) {
                                        $("." + valShow).fadeIn(config.speed, config.callback)
                                    })
                                } else {
                                    $("." + config.toshow).fadeIn(config.speed, config.callback)
                                }
                            });
                        })
                    } else {
                        $("." + config.tohide).fadeOut(config.speed, function () {
                            $("." + config.toshow).fadeIn(config.speed, config.callback)
                        });

                    }
                }
            }
            else {
                if (Array.isArray(config.tohide)) {
                    $.each(config.tohide, function (index, valHide) {
                        $("." + valHide).fadeOut(config.speed, function () {
                            if (Array.isArray(config.toshow)) {
                                $.each(config.toshow, function (index, valShow) {
                                    $("." + valShow).fadeIn(config.speed, config.callback)
                                })
                            } else {
                                $("." + config.toshow).fadeIn(config.speed, config.callback)
                            }
                        });
                    })
                } else {
                    $("." + config.tohide).fadeOut(config.speed, function () {
                        $("." + config.toshow).fadeIn(config.speed, config.callback)
                    });

                }
            }

            if (config.scrollTop) {
                $('html,body').animate({
                    scrollTop: 0 /*pos + (offeset ? offeset : 0)*/
                }, 'slow');
            }
        },

        refresh: function (config) {
            config = $.extend(true, {
                table: null
            }, config);

            if (config.table !== null) {
                if (config.table.constructor === Object) {
                    $.each(config.table, function (i, v) {
                        $("#" + v).dataTable().fnReloadAjax();
                    });
                }
                else if (config.table.constructor === Array) {
                    $.each(config.table, function (i, v) {
                        $("#" + v).dataTable().fnReloadAjax();
                    });
                }
                else {
                    $("#" + config.table).dataTable().fnReloadAjax();
                }
            }
            $('.disable').attr('disabled', true);
        },

        back: function (config) {
            config = $.extend(true, {
                speed: 'fast',
                easing: 'swing',
                callback: function () { },
                tohide: 'form_data',
                toshow: 'table_data',
                animate: null,
                loadPage: true,
                table: null,
                form: null,
            }, config);

            $.when(function () {
                if (config.table !== null) {
                    if (config.table.constructor === Object) {
                        $.each(config.table, function (i, v) {
                            $("#" + v).dataTable().fnReloadAjax();
                        });
                    }
                    else if (config.table.constructor === Array) {
                        $.each(config.table, function (i, v) {
                            $("#" + v).dataTable().fnReloadAjax();
                        });
                    }
                    else {
                        $("#" + config.table).dataTable().fnReloadAjax();
                    }
                }

                if (config.animate !== null) {
                    if (config.animate === 'toogle') {
                        if (Array.isArray(config.tohide)) {
                            $.each(config.tohide, function (index, valHide) {
                                $("." + valHide).fadeToggle(config.speed, function () {
                                    if (Array.isArray(config.toshow)) {
                                        $.each(config.toshow, function (index, valShow) {
                                            $("." + valShow).fadeToggle(config.speed, config.callback)
                                        })
                                    } else {
                                        $("." + config.toshow).fadeToggle(config.speed, config.callback)
                                    }
                                });
                            })
                        } else {
                            $("." + config.tohide).fadeToggle(config.speed, function () {
                                $("." + config.toshow).fadeToggle(config.speed, config.callback)
                            });

                        }
                    }
                    else if (config.animate === 'slide') {
                        if (Array.isArray(config.tohide)) {
                            $.each(config.tohide, function (index, valHide) {
                                $("." + valHide).slideUp(config.speed, function () {
                                    if (Array.isArray(config.toshow)) {
                                        $.each(config.toshow, function (index, valShow) {
                                            $("." + valShow).slideDown(config.speed, config.callback)
                                        })
                                    } else {
                                        $("." + config.toshow).slideDown(config.speed, config.callback)
                                    }
                                });
                            })
                        } else {
                            $("." + config.tohide).slideUp(config.speed, function () {
                                $("." + config.toshow).slideDown(config.speed, config.callback)
                            });

                        }
                    } else {
                        if (Array.isArray(config.tohide)) {
                            $.each(config.tohide, function (index, valHide) {
                                $("." + valHide).fadeOut(config.speed, function () {
                                    if (Array.isArray(config.toshow)) {
                                        $.each(config.toshow, function (index, valShow) {
                                            $("." + valShow).fadeIn(config.speed, config.callback)
                                        })
                                    } else {
                                        $("." + config.toshow).fadeIn(config.speed, config.callback)
                                    }
                                });
                            })
                        } else {
                            $("." + config.tohide).fadeOut(config.speed, function () {
                                $("." + config.toshow).fadeIn(config.speed, config.callback)
                            });

                        }
                    }
                }
                else {
                    if (Array.isArray(config.tohide)) {
                        $.each(config.tohide, function (index, valHide) {
                            $("." + valHide).fadeOut(config.speed, function () {
                                if (Array.isArray(config.toshow)) {
                                    $.each(config.toshow, function (index, valShow) {
                                        $("." + valShow).fadeIn(config.speed, config.callback)
                                    })
                                } else {
                                    $("." + config.toshow).fadeIn(config.speed, config.callback)
                                }
                            });
                        })
                    } else {
                        $("." + config.tohide).fadeOut(config.speed, function () {
                            $("." + config.toshow).fadeIn(config.speed, config.callback)
                        });

                    }
                }
            }()).done(function () {
                if (config.loadPage === true) {
                    $("[data-con='" + HELPER.getMenuId() + "']").trigger('click');
                }
            }());
        },

        reloadPage: function () {
            $("[data-con='" + HELPER.getMenuId() + "']").trigger('click');
        },

        getActivePage: function () {
            return HELPER.getMenuId();
        },

        save: function (config) {
            var xurl = null;
            if (config.addapi === true) {
                xurl = ($("[name=" + HELPER[config.fields][0] + "]").val() === "") ? HELPER[config.api].store : HELPER[config.api].update;
            }
            else {
                if (typeof HELPER.api != 'undefined') {
                    xurl = ($("[name=" + HELPER.fields[0] + "]").val() === "") ? HELPER.api.store : HELPER.api.update;
                }
            }
            config = $.extend(true, {
                form: null,
                confirm: false,
                confirmMessage: null,
                data: $.extend($('[name=' + config.form + ']').serializeObject(), {
                    system_csrf_aps_dev: $.cookie('system_csrf_aps_dev')
                }),
                method: 'POST',
                fields: 'fields',
                api: 'api',
                addapi: false,
                showMessage: false,
                url: xurl,
                xhr: function () {
                    var myXhr = $.ajaxSettings.xhr();
                    return myXhr;
                },
                cache: false,
                contentType: 'application/x-www-form-urlencoded',
                // processData: false,
                success: function (response) {
                    if (config.showMessage) {
                        HELPER.showMessage({
                            success: response.success,
                            message: response.message,
                            title: ((response.success) ? 'Success' : 'Failed')
                        });
                    }
                    unblock(100);
                },
                error: function (response, status, errorname) {
                    if (config.showMessage) {
                        HELPER.showMessage({
                            success: false,
                            title: errorname,
                            message: 'System error, please contact the Administrator'
                        });
                    }
                    unblock(100);
                },
                complete: function (response) {
                    var rsp = $.parseJSON(response.responseText);
                    config.callback(rsp.success, rsp.id, rsp.record, rsp.message, response);
                },
                callback: function (arg) { },
                oncancel: function (arg) { }
            }, config);

            var do_save = function (_config) {
                loadBlock('Sedang menyimpan data...');
                if (_config.data instanceof FormData) {
                    _config.data.append('system_csrf_aps_dev', $.cookie('system_csrf_aps_dev'));
                }
                $.ajax({
                    url: _config.url,
                    data: _config.data,
                    type: _config.method,
                    cache: _config.cache,
                    contentType: _config.contentType,
                    processData: _config.processData,
                    xhr: function () {
                        var myXhr = $.ajaxSettings.xhr();
                        return myXhr;
                    },
                    success: _config.success,
                    error: _config.error,
                    complete: _config.complete
                });
            }

            if (config.confirm) {
                Swal.fire({
                    title: 'Information',
                    text: ((config.confirmMessage != null) ? config.confirmMessage : "Apakah anda yakin untuk menyimpan data tersebut ?"),
                    icon: 'info',
                    confirmButtonText: '<i class="fa fa-check"></i> Yes',
                    confirmButtonClass: 'btn btn-focus btn-success m-btn m-btn--pill m-btn--air',
                    reverseButtons: true,
                    showCancelButton: true,
                    cancelButtonText: '<i class="fa fa-times"></i> No',
                    cancelButtonClass: 'btn btn-focus btn-danger m-btn m-btn--pill m-btn--air'
                }).then(function (result) {
                    if (result.value) {
                        do_save(config);
                    } else {
                        config.oncancel(result)
                    }
                });
            }
            else {
                do_save(config);
            }
        },

        destroy: function (config) {
            config = $.extend(true, {
                table: null,
                confirm: true,
                method: 'POST',
                api: 'api',
                data: null,
                multiple: false,
                fields: 'fields',
                callback: function (arg) { }
            }, config);

            var do_destroy = function (_config, id) {
                loadBlock('Sedang menghapus data...');
                var dataSend = {};
                if (_config.data === null) {
                    dataSend['id'] = id;
                }
                else {
                    dataSend['id'] = id;
                    $.each(_config.data, function (i, v) {
                        dataSend[i] = v;
                    });
                }
                $.ajax({
                    url: HELPER[config.api].destroy,
                    data: $.extend(dataSend, {
                        system_csrf_aps_dev: $.cookie('system_csrf_aps_dev')
                    }),
                    type: _config.method,
                    success: function (response) {
                        HELPER.showMessage({
                            success: response.success,
                            message: response.message,
                            title: ((response.success) ? 'Success' : 'Failed')
                        });
                        unblock(100);
                    },
                    error: function (response, status, errorname) {
                        HELPER.showMessage({
                            success: false,
                            title: 'Failed to operate',
                            message: errorname,
                        });
                        unblock(100);
                    },
                    complete: function (response) {
                        var rsp = $.parseJSON(response.responseText);
                        config.callback(rsp.success, rsp.id, rsp.record, rsp.message);
                    },
                })
            }

            var do_destroy_multiple = function (_config, data) {
                var dataSend = {};
                $.each(data, function (i, v) {
                    dataSend[i] = v;
                });
                loadBlock('Sedang menghapus data...');
                $.ajax({
                    url: config.url,
                    data: $.extend(dataSend, {
                        system_csrf_aps_dev: $.cookie('system_csrf_aps_dev')
                    }),
                    type: _config.method,
                    success: function (response) {
                        HELPER.showMessage({
                            success: response.success,
                            message: response.message,
                            title: ((response.success) ? 'Success' : 'Failed')
                        });
                        unblock(100);
                    },
                    error: function (response, status, errorname) {
                        HELPER.showMessage({
                            success: false,
                            title: 'Failed to operate',
                            message: errorname,
                        });
                        unblock(100);
                    },
                    complete: function (response) {
                        var rsp = $.parseJSON(response.responseText);
                        config.callback(rsp.success, rsp.id, rsp.record, rsp.message);
                    },
                })
            }
            if (config.multiple === false) {
                var data = null;
                $("#" + config.table).find('input[name=checkbox]').each(function (key, value) {
                    if ($(value).is(":checked")) {
                        data = $.parseJSON(atob($(value).data('record')));
                    }
                });
                if (data !== null) {
                    var id = data[HELPER[config.fields][0]];
                    if (config.confirm) {
                        Swal.fire({
                            title: 'Information',
                            text: "Anda yakin ingin menghapus data tersebut ?",
                            icon: 'warning',
                            confirmButtonText: '<i class="fa fa-check"></i> Yes',
                            confirmButtonClass: 'btn btn-focus btn-success m-btn m-btn--pill m-btn--air',

                            showCancelButton: true,
                            cancelButtonText: '<i class="fa fa-times"></i> No',
                            cancelButtonClass: 'btn btn-focus btn-danger m-btn m-btn--pill m-btn--air'
                        }).then(function (result) {
                            if (result.value) {
                                do_destroy(config, id);
                            }
                        });
                    }
                    else {
                        do_destroy(config, id);
                    }
                }
                else {
                    HELPER.showMessage({
                        title: 'Information',
                        message: 'You have not selected any data in the table ...!',
                        image: './assets/img/information.png',
                        time: 2000
                    })
                }
            }
            else {
                var data = [];
                $("#" + config.table).find('input[name=checkbox]').each(function (key, value) {
                    if ($(value).is(":checked")) {
                        var cek = $.parseJSON(atob($(value).data('record')));
                        data[key] = cek;
                    }
                });

                if (data.length > 0) {
                    if (config.confirm) {
                        Swal.fire({
                            title: 'Information',
                            text: "Anda yakin ingin menghapus data tersebut ?",
                            icon: 'warning',
                            confirmButtonText: '<i class="fa fa-check"></i> Yes',
                            confirmButtonClass: 'btn btn-focus btn-success m-btn m-btn--pill m-btn--air',

                            showCancelButton: true,
                            cancelButtonText: '<i class="fa fa-times"></i> No',
                            cancelButtonClass: 'btn btn-focus btn-danger m-btn m-btn--pill m-btn--air'
                        }).then(function (result) {
                            if (result.value) {
                                do_destroy_multiple(config, data);
                            }
                        });
                    }
                    else {
                        do_destroy_multiple(config, data);
                    }
                }
                else {
                    HELPER.showMessage({
                        title: 'Information',
                        message: 'You have not selected any data in the table ...!',
                        image: './assets/img/information.png',
                        time: 2000
                    })
                }
            }
        },

        getDataFromTable: function (config) {
            config = $.extend(true, {
                table: null,
                multiple: false,
                callback: function (args) { }
            }, config);
            var data = '';
            var multidata = [];

            $("#" + config.table).find('input[name=checkbox]').each(function (key, value) {
                if ($(value).is(":checked")) {
                    if (config.multiple) {
                        multidata.push($.parseJSON(atob($(value).data('record'))));
                    } else {
                        data = $.parseJSON(atob($(value).data('record')));
                    }
                }
            });
            if (config.multiple) {
                config.callback(multidata);
            } else {
                config.callback(data);
            }
        },

        saveMultiple: function (config) {
            config = $.extend(true, {
                url: null,
                table: null,
                confirm: true,
                method: 'POST',
                data: null,
                message: true,
                callback: function (arg) { },
                success: function (arg) { },
                error: function (arg) { },
                complete: function (arg) { },
                cache: false,
                contentType: false,
                processData: false,
                xhr: null,
            }, config);

            var sentData = function (_config, data) {
                var dataSend = {};
                var localdataSend = {};
                var xdataSend = {};

                if (config.data === null) {
                    $.each(data.server, function (i, v) {
                        dataSend[i] = v;
                    });
                    xdataSend = dataSend;
                } else {
                    $.each(data.server, function (i, v) {
                        dataSend[i] = v;
                    });
                    $.each(data.local, function (i, v) {
                        localdataSend[i] = v;
                    });
                    xdataSend['server'] = dataSend;
                    xdataSend['data'] = localdataSend;
                }

                loadBlock('');
                $.ajax({
                    url: config.url,
                    data: $.extend(xdataSend, {
                        system_csrf_aps_dev: $.cookie('system_csrf_aps_dev')
                    }),
                    type: _config.method,
                    cache: config.cache,
                    contentType: config.contentTypes,
                    processData: config.processDatas,
                    xhr: (config.xhr === null) ? function () {
                        var myXhr = $.ajaxSettings.xhr();
                        return myXhr;
                    } : config.xhr,
                    success: function (response) {
                        if (config.message == false) {
                            config.success(response);
                        } else {
                            config.success(response);
                            HELPER.showMessage({
                                success: response.success,
                                message: response.message,
                                title: ((response.success) ? 'Success' : 'Failed')
                            });
                        }
                    },
                    error: function (response, status, errorname) {
                        if (config.message == false) {
                            config.error(response, status, errorname);
                        } else {
                            config.error(response, status, errorname);
                            HELPER.showMessage({
                                success: false,
                                title: 'Failed to operate',
                                message: errorname,
                            });
                        }
                    },
                    complete: function (response) {
                        var rsp = $.parseJSON(response.responseText);
                        config.callback(rsp.success, rsp.id, rsp.record, rsp.message, rsp);
                        unblock(1000);
                    },
                });
            }

            var data = [];
            var xdata = [];
            $("#" + config.table).find('input[name=checkbox]').each(function (key, value) {
                if ($(value).is(":checked")) {
                    var cek = null;
                    if ($(value).val().length == 32) {
                        cek = $(value).val();
                    } else {
                        var cek = $.parseJSON(atob($(value).data('record')));
                    }
                    data[key] = cek;
                }
                xdata['server'] = data;
                xdata['local'] = config.data;
            });
            if (xdata.server.length > 0) {
                if (config.confirm) {
                    Swal.fire({
                        title: 'Information',
                        text: "Are you sure you want to save the data?",
                        icon: 'info',
                        confirmButtonText: '<i class="fa fa-check"></i> Yes',
                        confirmButtonClass: 'btn btn-focus btn-success m-btn m-btn--pill m-btn--air',

                        showCancelButton: true,
                        cancelButtonText: '<i class="fa fa-times"></i> No',
                        cancelButtonClass: 'btn btn-focus btn-danger m-btn m-btn--pill m-btn--air'
                    }).then(function (result) {
                        if (result.value) {
                            sentData(config, xdata);
                        }
                    });
                }
                else {
                    sentData(config, xdata);
                }
            }
        },

        setRowDataTable: function (config) {
            HELPER.saveMultiple(config);
        },

        loadData: function (config) {
            config = $.extend(true, {
                debug: false,
                table: null,
                type: 'POST',
                url: null,
                server: false,
                data: null,
                fields: 'fields',
                loadToForm: true,
                multiple: false,
                before_load: function () { },
                after_load: function () { },
                callback: function (arg) { }
            }, config);
            config.before_load();
            loadBlock('Displaying the result ...');
            if (config.server === true) {
                var dataserver = [];
                $("#" + config.table).find('input[name=checkbox]').each(function (key, value) {
                    if ($(value).is(":checked")) {
                        dataserver = $.parseJSON(atob($(value).data('record')));
                        dataserver['id'] = dataserver[HELPER.fields[0]];
                        dataserver['data'] = config.data;
                        $.ajax({
                            url: config.url,
                            data: $.extend(dataserver, {
                                system_csrf_aps_dev: $.cookie('system_csrf_aps_dev')
                            }),
                            type: config.type,
                            success: function (response) {
                                var data = '';
                                if (response.constructor === Object) {
                                    data = response;
                                }
                                else if (response.constructor === Array) {
                                    data = response[0];
                                }

                                if (data !== null && config.loadToForm) {
                                    $.when(function () {
                                        $.each(data, function (i, v) {
                                            if ($("[name=" + i + "]").find("option:selected").length) {
                                                $('[name="' + i + '"]').select2('val', data[v]);
                                            }
                                            else if ($("[name=" + i + "]").attr('type') == 'checkbox') {
                                                $('[name="' + i + '"][value="' + v + '"]').prop('checked', true);
                                            }
                                            else if ($("[name=" + i + "]").attr('type') == 'radio') {
                                                $('[name="' + i + '"][value="' + v + '"]').prop('checked', true);
                                            }
                                            else if ($("[name='" + i + "']").attr('type') == 'file') {
                                                $("[name=" + i + "]").val("");
                                            }
                                            else {
                                                $("[name=" + i + "]").val(html_entity_decode(v))
                                            }
                                        })
                                        if (dataserver['data'] !== null) {
                                            $.each(dataserver['data'], function (i, v) {
                                                if ($("[name=" + i + "]").attr('type') == 'checkbox') {
                                                    $('[name="' + i + '"][value="' + v + '"]').prop('checked', true);
                                                }
                                                else if ($("[name=" + i + "]").attr('type') == 'radio') {
                                                    $('[name="' + i + '"][value="' + v + '"]').prop('checked', true);
                                                }
                                                else {
                                                    $("[name=" + i + "]").val(html_entity_decode(v))
                                                }
                                            })
                                        }
                                        config.callback(data, dataserver);
                                        return data;
                                    }()).done(unblock(100))
                                }
                                else {
                                    $.when(unblock(100)).then(function () {
                                        HELPER.showMessage({
                                            title: 'Information',
                                            message: 'No data selected on the table ...!',
                                            image: './assets/img/information.png',
                                            time: 2000
                                        })
                                    }());
                                }
                            }
                        });
                        if (config.debug) { }
                    }
                });
            }
            else {
                var data = (config.multiple) ? [] : null;
                $("#" + config.table).find('input[name=checkbox]').each(function (key, value) {
                    if ($(value).is(":checked")) {
                        if (config.multiple) {
                            data.push($.parseJSON(atob($(value).data('record'))));
                        } else {
                            data = $.parseJSON(atob($(value).data('record')));
                        }
                        if (config.debug) { console.log(data) }
                    }
                });
                if (data !== null) {
                    $.when(function () {
                        if (config.loadToForm) {
                            HELPER[config.fields].forEach(function (v, i, a) {
                                if ($("[name=" + v + "]").find("option:selected").length) {
                                    if ($('[name="' + v + '"]').hasClass('select2-hidden-accessible')) {
                                        // $('[name="'+ v +'"]').select2('val',data[v]);
                                        $('[name="' + v + '"]').val(data[v]).trigger('change');
                                    } else {
                                        $('[name="' + v + '"]').val(data[v]);
                                    }
                                }
                                else if ($("[name=" + v + "]").attr('type') == 'checkbox') {
                                    $('[name="' + v + '"][value="' + data[v] + '"]').prop('checked', true);
                                }
                                else if ($("[name=" + v + "]").attr('type') == 'radio') {
                                    $('[name="' + v + '"][value="' + data[v] + '"]').prop('checked', true);
                                } else {
                                    $("[name=" + v + "]").val(html_entity_decode(data[v]))
                                }
                            });
                        }
                        config.callback(data);
                        return data;
                    }()).done(unblock(500));

                } else {
                    $.when(unblock(500)).then(function () {
                        HELPER.showMessage({
                            title: 'Information',
                            message: 'No data selected on the table ...!',
                            image: './assets/img/information.png',
                            time: 2000
                        })
                    }());
                }
            }

        },

        createCombo: function (config) {
            config = $.extend(true, {
                el: null,
                valueField: null,
                valueGroup: null,
                valueAdd: null,
                selectedField: null,
                displayField: null,
                displayField2: null,
                displayField3: null,
                url: null,
                placeholder: '-Choose-',
                optionCustom: null,
                grouped: false,
                withNull: true,
                data: null,
                chosen: false,
                sync: true,
                disableField: null,
                dropdownParent: '',
                elClass: false,
                allowClear: true,
                callback: function () { }
            }, config);

            if (config.url !== null) {
                $.ajax({
                    url: config.url,
                    data: $.extend(config.data, {
                        system_csrf_aps_dev: $.cookie('system_csrf_aps_dev')
                    }),
                    type: 'POST',
                    async: config.sync,
                    complete: function (response) {
                        var html = (config.withNull === true) ? "<option value>" + config.placeholder + "</option>" : "";
                        html += (config.optionCustom != null) ? "<option value='" + config.optionCustom.id + "'>" + config.optionCustom.name + "</option>" : "";
                        var data = $.parseJSON(response.responseText);
                        if (data.success) {
                            $.each(data.data, function (i, v) {
                                var selectedFix = '';
                                var disable_field = '';
                                if (config.disableField != null) {
                                    if (v[config.disableField]) {
                                        disable_field = 'disabled';
                                    }
                                }
                                var sarr = Array.isArray(config.selectedField);
                                if (sarr) {
                                    $.each(config.selectedField, function (isf, vsf) {
                                        if (vsf == v[config.valueField]) {
                                            selectedFix = 'selected';
                                        }
                                    })
                                } else {
                                    if (Number.isInteger(config.selectedField)) {
                                        if (config.selectedField == i) {
                                            selectedFix = 'selected';
                                            disable_field = '';
                                        }
                                    } else {
                                        if (config.selectedField == v[config.valueField]) {
                                            selectedFix = 'selected';
                                            disable_field = '';
                                        }
                                    }
                                }
                                if (config.grouped) {
                                    if (config.displayField3 != null) {
                                        html += "<option " + selectedFix + " value='" + v[config.valueField] + "' data-add='" + v[config.valueAdd] + "'  " + disable_field + " >" + v[config.displayField] + " - " + v[config.displayField2] + " ( " + v[config.displayField3] + " ) " + "</option>";
                                    } else {
                                        html += "<option " + selectedFix + " value='" + v[config.valueField] + "' data-add='" + v[config.valueAdd] + "'  " + disable_field + " >" + v[config.displayField] + " - " + v[config.displayField2] + "</option>";
                                    }
                                } else {
                                    var disable_field = '';
                                    if (config.disableField != null) {
                                        disable_field = 'disabled';
                                    }
                                    html += "<option " + selectedFix + " value='" + v[config.valueField] + "' data-add='" + v[config.valueAdd] + "' " + disable_field + " >" + v[config.displayField] + "</option>";
                                }
                            });
                            if (config.el.constructor === Array) {
                                $.each(config.el, function (i, v) {
                                    (config.elClass == true) ? $('.' + v).html(html) : $('#' + v).html(html);
                                })
                            } else {
                                (config.elClass == true) ? $('.' + config.el).html(html) : $('#' + config.el).html(html);
                            }
                            if (config.chosen) {
                                if (config.el.constructor === Array) {
                                    $.each(config.el, function (i, v) {
                                        (config.elClass == true) ? $('.' + v).addClass(v) : $('#' + v).addClass(v);
                                        $('.' + v).select2({
                                            allowClear: config.allowClear,
                                            dropdownAutoWidth: true,
                                            width: '100%',
                                            placeholder: config.placeholder,
                                            dropdownParent: config.dropdownParent,
                                        });
                                    })
                                } else {
                                    (config.elClass == true) ? $('.' + config.el).addClass(config.el) : $('#' + config.el).addClass(config.el);
                                    $('.' + config.el).select2({
                                        allowClear: config.allowClear,
                                        dropdownAutoWidth: true,
                                        width: '100%',
                                        placeholder: config.placeholder,
                                        dropdownParent: config.dropdownParent,
                                    });
                                }
                            } else {
                                if (config.el.constructor === Array) {
                                    $.each(config.el, function (i, v) {
                                        (config.elClass == true) ? $('.' + v).addClass(v) : $('#' + v).addClass(v);
                                        $('.' + v).select2({
                                            allowClear: config.allowClear,
                                            dropdownAutoWidth: true,
                                            width: '100%',
                                            dropdownParent: config.dropdownParent,
                                        });
                                    })
                                } else {
                                    (config.elClass == true) ? $('.' + config.el).addClass(config.el) : $('#' + config.el).addClass(config.el);
                                    $('.' + config.el).select2({
                                        allowClear: config.allowClear,
                                        dropdownAutoWidth: true,
                                        width: '100%',
                                        dropdownParent: config.dropdownParent,
                                    });
                                }
                            }
                        }
                        config.callback(data);
                    }
                });
            } else {
                var response = { success: false, message: 'Url kosong' };
                config.callback(response);
            }
        },

        createComboAPI: function (config) {
            config = $.extend(true, {
                el: null,
                valueField: null,
                valueGroup: null,
                valueAdd: null,
                selectedField: null,
                displayField: null,
                displayField2: null,
                displayField3: null,
                url: null,
                placeholder: '-Choose-',
                optionCustom: null,
                grouped: false,
                withNull: true,
                data: null,
                chosen: false,
                sync: true,
                disableField: null,
                dropdownParent: '',
                elClass: false,
                callback: function () { }
            }, config);

            if (config.url !== null) {
                $.ajax({
                    url: config.url,
                    data: $.extend(config.data, {
                        system_csrf_aps_dev: $.cookie('system_csrf_aps_dev')
                    }),
                    type: 'POST',
                    async: config.sync,
                    complete: function (response) {
                        var html = (config.withNull === true) ? "<option value>" + config.placeholder + "</option>" : "";
                        html += (config.optionCustom != null) ? "<option value='" + config.optionCustom.id + "'>" + config.optionCustom.name + "</option>" : "";
                        var data = $.parseJSON(response.responseText);
                        if (data.status) {
                            $.each(data.results, function (i, v) {
                                var selectedFix = '';
                                var disable_field = '';
                                if (config.disableField != null) {
                                    if (v[config.disableField]) {
                                        disable_field = 'disabled';
                                    }
                                }
                                var sarr = Array.isArray(config.selectedField);
                                if (sarr) {
                                    $.each(config.selectedField, function (isf, vsf) {
                                        if (vsf == v[config.valueField]) {
                                            selectedFix = 'selected';
                                        }
                                    })
                                } else {
                                    if (Number.isInteger(config.selectedField)) {
                                        if (config.selectedField == i) {
                                            selectedFix = 'selected';
                                            disable_field = '';
                                        }
                                    } else {
                                        if (config.selectedField == v[config.valueField]) {
                                            selectedFix = 'selected';
                                            disable_field = '';
                                        }
                                    }
                                }
                                if (config.grouped) {
                                    if (config.displayField3 != null) {
                                        html += "<option " + selectedFix + " value='" + v[config.valueField] + "' data-add='" + v[config.valueAdd] + "'  " + disable_field + " >" + v[config.displayField] + " - " + v[config.displayField2] + " ( " + v[config.displayField3] + " ) " + "</option>";
                                    } else {
                                        html += "<option " + selectedFix + " value='" + v[config.valueField] + "' data-add='" + v[config.valueAdd] + "'  " + disable_field + " >" + v[config.displayField] + " " + v[config.displayField2] + "</option>";
                                    }
                                } else {
                                    var disable_field = '';
                                    if (config.disableField != null) {
                                        disable_field = 'disabled';
                                    }
                                    html += "<option " + selectedFix + " value='" + v[config.valueField] + "' data-add='" + v[config.valueAdd] + "' " + disable_field + " >" + v[config.displayField] + "</option>";
                                }
                            });
                            if (config.el.constructor === Array) {
                                $.each(config.el, function (i, v) {
                                    (config.elClass == true) ? $('.' + v).html(html) : $('#' + v).html(html);
                                    // $('#'+v).html(html);
                                })
                            } else {
                                (config.elClass == true) ? $('.' + config.el).html(html) : $('#' + config.el).html(html);
                                // $('#' + config.el).html(html);
                            }
                            if (config.chosen) {
                                if (config.el.constructor === Array) {
                                    $.each(config.el, function (i, v) {
                                        (config.elClass == true) ? $('.' + v).addClass(v) : $('#' + v).addClass(v);
                                        // $('#'+v).addClass(v);
                                        $('.' + v).select2({
                                            allowClear: true,
                                            dropdownAutoWidth: true,
                                            width: '100%',
                                            placeholder: config.placeholder,
                                            dropdownParent: config.dropdownParent,
                                        });
                                    })
                                } else {
                                    (config.elClass == true) ? $('.' + config.el).addClass(config.el) : $('#' + config.el).addClass(config.el);
                                    // $('#' + config.el).addClass(config.el);
                                    $('.' + config.el).select2({
                                        allowClear: true,
                                        dropdownAutoWidth: true,
                                        width: '100%',
                                        placeholder: config.placeholder,
                                        dropdownParent: config.dropdownParent,
                                    });
                                }
                            } else {
                                if (config.el.constructor === Array) {
                                    $.each(config.el, function (i, v) {
                                        (config.elClass == true) ? $('.' + v).addClass(v) : $('#' + v).addClass(v);
                                        // $('#'+v).addClass(v);
                                        $('.' + v).select2({
                                            allowClear: true,
                                            dropdownAutoWidth: true,
                                            width: '100%',
                                            dropdownParent: config.dropdownParent,
                                        });
                                    })
                                } else {
                                    (config.elClass == true) ? $('.' + config.el).addClass(config.el) : $('#' + config.el).addClass(config.el);
                                    // $('#' + config.el).addClass(config.el);
                                    $('.' + config.el).select2({
                                        allowClear: true,
                                        dropdownAutoWidth: true,
                                        width: '100%',
                                        dropdownParent: config.dropdownParent,
                                    });
                                }
                            }
                        }
                        config.callback(data);
                    }
                });
            }
            else {
                var response = { success: false, message: 'Url kosong' };
                config.callback(response);
            }
        },

        createGroupCombo: function (config) {
            config = $.extend(true, {
                el: null,
                valueField: null,
                valueGroup: null,
                displayField: null,
                url: null,
                grouped: false,
                withNull: true,
                data: null,
                chosen: false,
                callback: function () { }
            }, config);

            if (config.url !== null) {
                $.ajax({
                    url: config.url,
                    data: $.extend(config.data, {
                        system_csrf_aps_dev: $.cookie('system_csrf_aps_dev'),
                        id: config.valueField,
                        id_group: config.valueGroup,
                    }),
                    type: 'POST',
                    complete: function (response) {
                        var data = $.parseJSON(response.responseText);
                        var html = (config.withNull === true) ? "<option value>-Pilih-</option>" : "";
                        if (data.success) {
                            if (config.grouped) {
                                $.each(data.data, function (i, v) {
                                    html += '<optgroup label="' + i + '" style="font-wight:bold;">';
                                    $.each(v, function (i2, v2) {
                                        html += '<option value="' + v2[config.valueField] + '">' + v2[config.displayField] + '</option>';
                                    });
                                    html += '</optgroup>';
                                });
                            } else {

                            }

                            if (config.el.constructor === Array) {
                                $.each(config.el, function (i, v) {
                                    $('#' + v).html(html);
                                })
                            } else {
                                $('#' + config.el).html(html);
                            }

                            if (config.chosen) {
                                if (config.el.constructor === Array) {
                                    $.each(config.el, function (i, v) {
                                        $('#' + v).addClass(v);
                                        $('.' + v).select2({
                                            allowClear: true,
                                            dropdownAutoWidth: true,
                                            width: 'auto',
                                            placeholder: "-Choose-",
                                        });
                                    })
                                } else {
                                    $('#' + config.el).addClass(config.el);
                                    $('.' + config.el).select2({
                                        allowClear: true,
                                        dropdownAutoWidth: true,
                                        width: 'auto',
                                        placeholder: "-Choose-",
                                    });
                                }
                            }

                        }
                        config.callback(data);
                    }
                });
            } else {
                var response = { success: false, message: 'Url kosong' };
                config.callback(response);
            }
        },

        createChangeCombo: function (config) {
            config = $.extend(true, {
                el: null,
                data: null,
                url: null,
                reset: null,
                callback: function () { }
            }, config);

            $('#' + config.el).change(function () {
                var id = $(this).val();
                var data = {};
                if (config.reset !== null) {
                    if (Array.isArray(config.reset)) {
                        $.each(config.reset, (i,v) => {
                            $('[name="' + v + '"]').val("").select2("");
                            $('[name="' + v + '"]').html("");
                        });
                    } else {
                        $('[name="' + config.reset + '"]').val("").select2("");
                    }
                } if (config.data === null) {
                    data['id'] = id;
                } else {
                    data = config.data;
                    data['id'] = id;
                }
                $.ajax({
                    url: config.url,
                    data: $.extend(data, {
                        system_csrf_aps_dev: $.cookie('system_csrf_aps_dev'),
                    }),
                    type: 'POST',
                    complete: function (response) {
                        var rsp = $.parseJSON(response.responseText);
                        config.callback(rsp.success, id, rsp.data, rsp.total, response);
                    },
                    callback: function (arg) { }
                });
            });
        },

        setChangeCombo: function(config) {
            config = $.extend(true, {
                el: null,
                data: {},
                valueField: null,
                valueAdd: null,
                displayField: null,
                displayField2: null,
                grouped: false,
                withNull: true,
                withNullDisabled: true,
                idMode: false,
                placeholder: '',
                select2: false,
            }, config);

            var html = '';
            if (config.idMode === true) {
                html = (config.withNull === true) ? "<option value='' selected "+((config.withNullDisabled) ? 'disabled' : '') +">" + config.placeholder + "</option>" : "";
                $.each(config.data, function(i, v) {
                    var vAdd = '';
                    if (v[config.valueAdd]) {
                        vAdd = " data-add='" + v[config.valueAdd] + "'";
                    }
                    if (config.grouped) {
                        if (config.displayField3 != null) {
                            html += "<option value='" + v[config.valueField] + "' " + vAdd + ">" + v[config.displayField2] + " - " + v[config.displayField] + " ( " + v[config.displayField3] + " ) " + "</option>";
                        } else {
                            html += "<option value='" + v[config.valueField] + "' " + vAdd + ">" + v[config.displayField2] + " - " + v[config.displayField] + "</option>";
                        }
                    } else {
                        html += "<option value='" + v[config.valueField] + "' " + vAdd + ">" + v[config.displayField] + "</option>";
                    }
                });
            } else {
                html = (config.withNull === true) ? "<option value='' selected "+((config.withNullDisabled) ? 'disabled' : '') +">" + config.placeholder + "</option>" : "";
                $.each(config.data, function(i, v) {
                    var vAdd = '';
                    if (v[config.valueAdd]) {
                        vAdd = " data-add='" + v[config.valueAdd] + "'";
                    }
                    if (config.grouped) {
                        if (config.displayField3 != null) {
                            html += "<option value='" + v[config.valueField] + "' " + vAdd + ">" + v[config.displayField2] + " - " + v[config.displayField] + " ( " + v[config.displayField3] + " ) " + "</option>";
                        } else {
                            html += "<option value='" + v[config.valueField] + "' " + vAdd + ">" + v[config.displayField2] + " - " + v[config.displayField] + "</option>";
                        }
                    } else {
                        html += "<option value='" + v[config.valueField] + "' " + vAdd + ">" + v[config.displayField] + "</option>";
                    }
                });
            }

            if (Array.isArray(config.el)) {
                $.each(config.el, function(i,v) {
                    $('#' + v).html(html);
                    if (config.select2 == true) {
                        $('#' + v).select2({
                            allowClear: true,
                            dropdownAutoWidth : true,
                            width: '100%',
                            placeholder: config.placeholder
                        });
                    }
                })
            } else {
                $('#' + config.el).html(html);
                if (config.select2 == true) {
                    $('#'+config.el).select2({
                        allowClear: true,
                        dropdownAutoWidth : true,
                        width: '100%',
                        placeholder: config.placeholder
                    });
                }
            }
        },

        templateResult: function (state) {
            return (state.view ? $(state.view) : state.text);
        },

        ajaxCombo: function (config) {
            config = $.extend(true, {
                el: null,
                limit: 30,
                url: null,
                tempData: null,
                data: {},
                clear: true,
                tab: false,
                wresult: 'none',
                displayField: null,
                callback: function (res) { }
            }, config);

            $(config.el).select2({
                dropdownCssClass: config.wresult,
                selectOnClose: config.tab,
                tags: true,
                allowClear: config.clear,
                dropdownAutoWidth: true,
                width: '100%',
                ajax: {
                    url: config.url,
                    dataType: 'json',
                    delay: 500,
                    type: 'post',
                    data: function (params) {
                        return {
                            q: params.term, // search term
                            page: params.page,
                            limit: config.limit,
                            fdata: config.data,
                            system_csrf_aps_dev: $.cookie('system_csrf_aps_dev')
                        };
                    },
                    processResults: function (data, params) {
                        params.page = params.page || 1;
                        return {
                            results: data.items,
                            pagination: {
                                more: (params.page * config.limit) < data.total_count
                            }
                        };
                    },
                    cache: true
                },
                templateResult: HELPER.templateResult,
                placeholder: 'ketik atau pilih data',
                minimumInputLength: 0,
                templateSelection: function (data, container) {
                    $(data.element).attr('data-temp', data.saved);
                    $.each(config.tempData, function (i, v) {
                        $(data.element).attr('data-' + v.key, v.val);
                    })
                    return data[config.displayField] || data.text;
                }
            });
        },

        ajaxCombox: function (config) {
            config = $.extend(true, {
                el: null,
                limit: 30,
                url: null,
                tempData: null,
                data: {},
                placeholder: null,
                displayField: null,
                displayField2: null,
                displayField3: null,
                grouped: false,
                selected: null,
                callback: function (res) { }
            }, config);
            var myQ = new Queue();

            myQ.enqueue(function (next) {
                $(config.el).select2({
                    ajax: {
                        url: config.url,
                        dataType: 'json',
                        type: 'post',
                        data: function (params) {
                            // var search = null;
                            // if (params.term==null && config.sea) {}

                            return {
                                q: params.term, // search term
                                page: params.page,
                                limit: config.limit,
                                fdata: config.data,
                                selectedId: (config.selected != null ? config.selected.id : null),
                                system_csrf_aps_dev: $.cookie('system_csrf_aps_dev')
                            };
                        },
                        processResults: function (data, params) {
                            params.page = params.page || 1;
                            return {
                                results: data.items,
                                pagination: {
                                    more: (params.page * config.limit) < data.total_count
                                }
                            };
                        },
                        cache: true
                    },
                    placeholder: (config.placeholder ? config.placeholder : '- Choose -'),
                    minimumInputLength: 0,
                    templateSelection: function (data, container) {
                        $(data.element).attr('data-temp', data.saved);
                        $.each(config.tempData, function (i, v) {
                            $(data.element).attr('data-' + v.key, v.val);
                        })
                        var display = data.text;
                        if (config.displayField != null && data[config.displayField]) {
                            if (config.grouped && config.displayField2 != null) {
                                if (config.displayField3 != null) {
                                    display = data[config.displayField] + " - " + data[config.displayField2] + " ( " + data[config.displayField3] + " )"
                                } else {
                                    display = data[config.displayField] + " - " + data[config.displayField2]
                                }
                            } else {
                                display = data[config.displayField];
                            }
                        }
                        return display;
                    },
                    templateResult: function (data) {
                        if (data.loading) {
                            return data.text;
                        }

                        var display = data.text;
                        if (config.displayField != null) {
                            if (config.grouped && config.displayField2 != null) {
                                if (config.displayField3 != null) {
                                    display = data[config.displayField] + " - " + data[config.displayField2] + " ( " + data[config.displayField3] + " )"
                                } else {
                                    display = data[config.displayField] + " - " + data[config.displayField2]
                                }
                            } else {
                                display = data[config.displayField];
                            }
                        }

                        return display;
                    }
                });
                next()
            }, 'pertama').enqueue(function (next) {
                if (config.selected) {
                    var option = new Option(config.selected.name, config.selected.id, true, true);
                    $(config.el).append(option).trigger('change');
                }
                next()
            }, 'kedua').dequeueAll()
        },

        ajax: function (config) {
            config = $.extend(true, {
                data: null,
                url: null,
                type: "POST",
                dataType: null,
                success: function () { },
                complete: function () { },
                done: function () { },
                error: function () { }
            }, config);
            $.ajax({
                url: config.url,
                data: $.extend(config.data, {
                    system_csrf_aps_dev: $.cookie('system_csrf_aps_dev')
                }),
                type: config.type,
                dataType: config.dataType,
                success: function (data) {
                    config.success(data);
                },
                complete: function (response) {
                    var rsp = $.parseJSON(response.responseText);
                    config.complete(rsp, response);
                },
                error: function (error) {
                    config.error(error);
                },
            }).done(function (response) {
                config.done(response);
            });
        },

        showMessage: function (config) {
            config = $.extend(true, {
                success: false,
                message: 'System error, please contact the Administrator',
                title: 'Failed',
                time: 5000,
                sticky: false,
                allowOutsideClick: true,
                // image: ((config.success) ? './assets/img/success.png' : './assets/img/error.png'),
                callback: function () { },
            }, config);
            if (config.success == true) {
                Swal.fire({
                    title: (config.title == "Failed") ? "Success" : config.title,
                    text: config.message,
                    icon: "success",
                    allowOutsideClick: config.allowOutsideClick,
                }).then(function (result) {
                    config.callback(result);
                });
            } else {
                if (config.success == false) {
                    Swal.fire({
                        title: config.title,
                        text: config.message,
                        icon: "error",
                        allowOutsideClick: config.allowOutsideClick,
                    }).then(function (result) {
                        config.callback(result);
                    });
                } else {
                    Swal.fire({
                        title: config.title,
                        text: config.message,
                        icon: config.success,
                        allowOutsideClick: config.allowOutsideClick,
                    }).then(function (result) {
                        config.callback(result);
                    });
                }
            }

            // config.callback();
        },

        // handleValidation: function (config) {

        //     config = $.extend(true, {
        //         el: null,
        //         setting: null,
        //         decalrative: false,
        //         customPlugin: null,
        //         submit: true,
        //         useRegex: false,
        //     }, config);

        //     if (config.el != null && (config.setting != null || config.decalrative == true)) {
        //         var fields = [];
        //         $.each(config.setting, function (i, v) {
        //             var temp_validators = [];
        //             $.each(v.rule, function (ii, vv) {
        //                 var temp_val = {};
        //                 if (v.hasOwnProperty('maxlength') && v.hasOwnProperty('minlength')) {
        //                     temp_validators['stringLength'] = {
        //                         max: v.maxlength,
        //                         min: v.minlength
        //                     }
        //                 } else {
        //                     if (ii == 'maxlength') {
        //                         temp_validators['stringLength'] = {
        //                             max: vv
        //                         }
        //                     }
        //                     if (ii == 'minlength') {
        //                         temp_validators['stringLength'] = {
        //                             min: vv
        //                         }
        //                     }
        //                 }
        //                 if (ii == 'required') {
        //                     temp_validators['notEmpty'] = vv;
        //                     $(v.selector).attr('required', true)
        //                     if ($(v.selector).parents('.form-group').children('label').children('span.required').length <= 0) {
        //                         var vLabel = `${$(v.selector).parents('.form-group').children('label').html()} <span class="required text-danger" aria-required="true"> *</span>`;
        //                         $(v.selector).parents('.form-group').children('label').html(vLabel)
        //                     }
        //                 } else if (ii == 'readonly' && vv == true) {
        //                     temp_validators['notEmpty'] = {}
        //                     $(v.selector).attr('readonly', true)
        //                 } else if (ii == 'email' && vv == true) {
        //                     temp_validators['emailAddress'] = {}
        //                 } else if (ii == 'disabled' && vv == true) {
        //                     temp_validators['notEmpty'] = {}
        //                     $(v.selector).attr('disabled', true)
        //                 } else if (ii == 'max') {
        //                     temp_validators['lessThan'] = {
        //                         max: vv
        //                     }
        //                 } else if (ii == 'min') {
        //                     temp_validators['greaterThan'] = {
        //                         min: vv
        //                     }
        //                 } else if (ii == 'callback') {
        //                     temp_validators['callback'] = vv
        //                 } else if (ii == 'promise') {
        //                     temp_validators['promise'] = vv
        //                 } else if (ii == 'useRegex' && vv == true) {
        //                     temp_validators['regexp'] = {
        //                         regexp: /^[^*/|\"<>[\]{}`\\';&$]+$/,
        //                         message: 'Hanya diperbolehkan huruf, angka dan beberapa karakter.'
        //                     }
        //                 } else {
        //                     temp_validators[ii] = vv
        //                 }
        //             });

        //             fields[v.name] = {
        //                 selector: v.selector,
        //                 validators: temp_validators
        //             }
        //         });

        //         var pluginValidation = { //Learn more: https://formvalidation.io/guide/plugins
        //             trigger: new FormValidation.plugins.Trigger(),
        //             // Bootstrap Framework Integration
        //             bootstrap: new FormValidation.plugins.Bootstrap(),
        //         };

        //         if (config.submit) {
        //             // Validate fields when clicking the Submit button
        //             pluginValidation['submitButton']  = new FormValidation.plugins.SubmitButton()
        //             // Submit the form when all fields are valid
        //             pluginValidation['defaultSubmit'] = new FormValidation.plugins.DefaultSubmit()
        //         }

        //         if (config.decalrative) {
        //             pluginValidation['declarative'] = new FormValidation.plugins.Declarative({
        //                 html5Input: true,
        //             });
        //         }
        //         if (config.customPlugin) {
        //             if (Array.isArray(config.customPlugin)) {
        //                 $.each(config.customPlugin, function (i, v) {
        //                     if (v.hasOwnProperty('pluginName') && v.hasOwnProperty('pluginConfig')) {
        //                         pluginValidation[v.pluginName] = v.pluginConfig;
        //                     }
        //                 });
        //             } else {
        //                 if (config.customPlugin.hasOwnProperty('pluginName') && config.customPlugin.hasOwnProperty('pluginConfig')) {
        //                     pluginValidation[config.customPlugin.pluginName] = config.customPlugin.pluginConfig;
        //                 }
        //             }

        //         }

        //         const fv = FormValidation.formValidation(
        //             document.getElementById(config.el),
        //             {
        //                 locale: 'id_ID',
        //                 localization: FormValidation.locales.id_ID,
        //                 fields: fields,
        //                 plugins: pluginValidation
        //             }
        //         );
        //         var fvFields = fv.getFields();
        //         for (var index in fvFields) {
        //             if (typeof index !== 'undefined') {
        //                 var v = fvFields[index];
        //                 if (v.hasOwnProperty('validators')) {
        //                     if (v.validators.hasOwnProperty('notEmpty')) {
        //                         var selectorField = null;
        //                         if (v.hasOwnProperty('selector') && v.selector != "") {
        //                             selectorField = v.selector
        //                         } else {
        //                             selectorField = "[name=" + index + "]";
        //                         }
        //                         if ($('#' + config.el).find(selectorField).parents('.form-group').children('label').children('span.required').length <= 0) {
        //                             $('#' + config.el).find(selectorField).parents('.form-group').children('label').append('<span class="required text-danger" aria-required="true"> *</span>')
        //                         }
        //                     }
        //                 }
        //                 if (config.useRegex) {
        //                     var selectorField = null;
        //                     if (v.hasOwnProperty('selector') && v.selector != "") {
        //                         selectorField = v.selector
        //                     } else {
        //                         selectorField = "[name=" + index + "]";
        //                     }
        //                     var regexpchar = /^[^*/|\"<>[\]{}`\\';&$]+$/;
        //                     var optionsNewField = {
        //                         validators: {
        //                             regexp: {
        //                                 regexp: /^[^*/|\"<>[\]{}`\\';&$]+$/,
        //                                 message: 'Hanya diperbolehkan huruf, angka dan beberapa karakter.'
        //                             }
        //                         }
        //                     }
        //                     fv.addField(index, optionsNewField)
        //                 }
        //             }
        //         }

        //         return fv;
        //     } else {
        //         return false;
        //     }

        // },

        handleValidation: function (config) {
            config = $.extend(true, {
                el: null,
                trim: true,
                useRegex: false,
                setting: null,
                submit: true,
                callback: function(){}
            }, config);

            if (config.el != null || config.el != '') {
                var fields = [];
                if (config.setting != null || config.setting != '') {
                    var issetCombobox = [];
                    $.each(config.setting, function (i, v) {
                        var temp_validators = [];
                        if (v.id != null || v.id != '') {
                            var vLabel = ($(`#${v.id}`).parents('.form-group').children('label').children('span.required').length <= 0)? `${$(`#${v.id}`).parents('.form-group').children('label').html()}`:'';
                            // text length
                            if (((typeof v.rule.minlength !== 'undefined') && (typeof v.rule.maxlength !== 'undefined')) || ($(`#${v.id}`).hasOwnProperty('maxlength') && $(`#${v.id}`).hasOwnProperty('minlength'))) {
                                // max & min length
                                $(`#${v.id}`).attr({
                                    maxlength: v.rule.maxlength,
                                    minlength: v.rule.minlength
                                });
                                temp_validators['stringLength'] = {
                                    max: v.rule.maxlength,
                                    min: v.rule.minlength,
                                    message: `${vLabel} tidak boleh kurang dari ${v.rule.minlength} atau lebih dari ${v.rule.maxlength}.`
                                }
                            } else {
                                if ((typeof v.rule.minlength !== 'undefined')) {
                                    // min length
                                    $(`#${v.id}`).attr({minlength: v.rule.minlength});
                                    temp_validators['stringLength'] = {
                                        min: v.rule.minlength,
                                        message: `${vLabel} tidak boleh kurang dari ${v.rule.minlength}.`
                                    }
                                } else if ((typeof v.rule.minlength !== 'undefined')) {
                                    // max length 
                                    $(`#${v.id}`).attr({maxlength: v.rule.maxlength});
                                    temp_validators['stringLength'] = {
                                        max: v.rule.maxlength,
                                        message: `${vLabel} tidak boleh lebih dari ${v.rule.maxlength}.`
                                    }
                                }
                            }

                            // requeired
                            if ((typeof v.rule.required !== 'undefined') && v.rule.required === true) {
                                var requiredLabel = `<span class="required text-danger" aria-required="true"> *</span>`;
                                    temp_validators['notEmpty'] = {message : `${vLabel} tidak boleh kosong.`};
                                    $(`#${v.id}`).parents('.form-group').children('label').html(`${vLabel} ${requiredLabel}`);
                                    $(`#${v.id}`).attr('required', true)
                            }

                            // regex
                            if ((typeof v.rule.useRegex !== 'undefined') && v.rule.useRegex === true) {
                                temp_validators['regexp'] = {
                                    regexp: /^[^*/|\"<>[\]{}`\\';&$]+$/,
                                    message: 'Hanya diperbolehkan huruf, angka dan beberapa karakter.'
                                }
                            }

                            // trim
                            if ((typeof v.rule.trim !== 'undefined') && v.rule.trim === true) {
                                    $(`#${v.id}`).on('blur', function(){
                                        var valID = $(this)[0].value;
                                            $(`#${v.id}`).val($.trim(valID));
                                    });
                            }
                        }

                        issetCombobox.push(v.id);

                        fields[v.id] = {
                            selector: `#${v.id}`,
                            validators: temp_validators
                        }
                    });
                }

                //Learn more: https://formvalidation.io/guide/plugins
                var pluginValidation = {
                    trigger: new FormValidation.plugins.Trigger(),
                    // Bootstrap Framework Integration
                    bootstrap: new FormValidation.plugins.Bootstrap(),
                };
                if (config.submit) {
                    // Validate fields when clicking the Submit button
                    pluginValidation['submitButton']  = new FormValidation.plugins.SubmitButton();
                    // Submit the form when all fields are valid
                    pluginValidation['defaultSubmit'] = new FormValidation.plugins.DefaultSubmit();
                }
                var valid = true;
                var objectConf = {
                    fields: fields,
                    plugins: pluginValidation,
                    success: function(valid) {}
                };
                var validator = FormValidation.formValidation(document.getElementById(config.el), objectConf);
                // combobox validation
                if (issetCombobox.length > 0) {
                    $.each(issetCombobox, function(i,v) {
                        $(`[name="${v}"]`).on('change', function(){
                            // Revalidate field
                            validator.revalidateField(`${v}`);
                        });
                    });
                }
            }
        },

        setRequired: function (el) {
            $(el).each(function (i, v) {
                $("[name=" + v + "]").attr('required', true).parents('.form-group').children('label').append('<span class="required" aria-required="true"> *</span>')
            })
        },

        print: function (config) {
            config = $.extend(true, {
                el: 'bodylaporan',
                page: null,
                csslink: null,
                historyprint: null,
                callback: function () { }
            }, config);

            var contents = (config.el.length > 32) ? config.el : $("#" + config.el).html();
            var frame1 = $('<iframe />');
            frame1[0].name = "frame1";
            frame1.css({ "position": "absolute", "top": "-1000000px" });
            $("body").append(frame1);
            var frameDoc = frame1[0].contentWindow ? frame1[0].contentWindow : frame1[0].contentDocument.document ? frame1[0].contentDocument.document : frame1[0].contentDocument;
            frameDoc.document.open();
            frameDoc.document.write("<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\">");
            frameDoc.document.write('<html>');
            frameDoc.document.write('</head>');
            frameDoc.document.write('</body>');
            if (config.csslink != null) {
                if (config.csslink.constructor === Array) {
                    $.each(config.csslink, function (i, v) {
                        frameDoc.document.write('<link href="' + v + '" rel="stylesheet" type="text/css" />');
                    })
                }
                else {
                    frameDoc.document.write('<link href="' + config.csslink + '" rel="stylesheet" type="text/css" />');
                }
            }
            frameDoc.document.write(contents);
            frameDoc.document.write('</body></html>');
            frameDoc.document.close();
            if (config.historyprint != null) {
                $.ajax({
                    url: config.historyprint,
                    success: function (response) { },
                    complete: function (response) {
                        var rsp = $.parseJSON(response.responseText);
                        config.callback(rsp.success, id, rsp.data, rsp.total);
                    },
                    callback: function (arg) { }
                });
            }
            setTimeout(function () {
                window.frames["frame1"].focus();
                window.frames["frame1"].print();
                frame1.remove();
            }, 300);
        },

        confirm: function (config) {
            config = $.extend(true, {
                title: 'Information',
                message: null,
                size: 'small',
                type: 'warning',
                confirmLabel: '<i class="fa fa-check"></i> Yes',
                confirmClassName: 'btn btn-focus btn-success m-btn m-btn--pill m-btn--air',
                cancelLabel: '<i class="fa fa-times"></i> No',
                cancelClassName: 'btn btn-focus btn-danger m-btn m-btn--pill m-btn--air',
                showLoaderOnConfirm: false,
                allowOutsideClick: true,
                callback: function () { }
            }, config);
            Swal.fire({
                title: config.title,
                text: config.message,
                icon: config.type,
                confirmButtonText: config.confirmLabel,
                confirmButtonClass: config.confirmClassName,
                reverseButtons: true,
                showCancelButton: true,
                cancelButtonText: config.cancelLabel,
                cancelButtonClass: config.cancelClassName,
                allowOutsideClick: config.allowOutsideClick
            }).then(function (result) {
                config.callback(result.value);
            });
        },

        confirmDelete: function (config) {
            config = $.extend(true, {
                url: null,
                data: null,
                type: null,
                withAjax: true,
                callback: function () { }
            }, config);
            HELPER.confirm({
                message: 'Anda yakin ingin menghapus data tersebut ?',
                callback: function (result) {
                    if (result && config.withAjax) {
                        HELPER.block();
                        HELPER.ajax({
                            url: (config.url == null) ? HELPER.api.destroy : config.url,
                            data: $.extend(config.data, {
                                system_csrf_aps_dev: $.cookie('system_csrf_aps_dev')
                            }),
                            type: (config.type == null) ? 'POST' : config.type,
                            complete: function (response) {
                                HELPER.showMessage({
                                    success: response.success,
                                    title: (response.success) ? 'Success' : 'Failed',
                                    message: response.message
                                });
                                config.callback(response);
                                HELPER.unblock(500);
                            }
                        });
                    }
                    else {
                        config.callback(result);
                    }
                }
            });
        },

        prompt: function (config) {
            config = $.extend(true, {
                title: null,
                inputType: null,
                confirmLabel: '<i class="fa fa-check"></i> Yes',
                confirmClassName: 'btn btn-focus btn-success m-btn m-btn--pill m-btn--air',
                cancelLabel: '<i class="fa fa-times"></i> No',
                cancelClassName: 'btn btn-focus btn-danger m-btn m-btn--pill m-btn--air',
                inputOptions: null,
                html: '',
                size: null,
                type: 'info',
                message: null,
                callback: function () { }
            }, config);

            Swal.fire({
                title: (config.title != null) ? config.title : 'Information',
                input: config.inputType,
                text: config.message,
                html: config.html,
                icon: config.type,
                confirmButtonText: config.confirmLabel,
                confirmButtonClass: config.confirmClassName,

                reverseButtons: true,
                showCancelButton: true,
                cancelButtonText: config.cancelLabel,
                cancelButtonClass: config.cancelClassName
            }).then(function (result) {
                config.callback(result);
            });
        },

        toExcel: function (config) {
            config = $.extend(true, {
                el: null,
                title: null,
            }, config);

            if (config.el.constructor === Array) {
                $.each(config.el, function (i, v) {
                    if (i == 0) {
                        tableToExcel(v, config.title);
                    } else {
                        tableToExcel(v, config.title + '-' + (i + 2));
                    }
                });
            } else {
                tableToExcel(config.el, config.title);
            }
        },

        toWord: function (config) {
            config = $.extend(true, {
                el: null,
                title: null,
                paperSize: null,
                style: null,
                margin: null,
            }, config);

            var html, link, blob, url, css, margin;
            margin = (config.margin != null) ? config.margin : '1cm 1cm 1cm 1cm';
            css = (
                '<style>' +
                '@page ' + config.el + '{size: ' + paperSize(config.paperSize) + '; margin: ' + margin + ';}' +
                'div.' + config.el + ' {page: ' + config.el + ';} ' + config.style +
                '</style>'
            );

            html = window.$('#' + config.el).html();
            blob = new Blob(['\ufeff', css + html], { type: 'application/msword;charset=utf-8' });
            url = URL.createObjectURL(blob);
            link = document.createElement('A');
            link.href = url;
            // Set default file name. 
            // Word will append file extension - do not add an extension here.
            link.download = config.title;
            document.body.appendChild(link);
            if (navigator.msSaveOrOpenBlob) navigator.msSaveOrOpenBlob(blob, config.title + '.doc'); // IE10-11
            else link.click();
            document.body.removeChild(link);
        },

        initChart: function (config) {
            if (typeof (AmCharts) === 'undefined' || $('#' + config.container).length === 0) {
                return;
            }

            config = $.extend(true, config, {
                valueAxes: [{
                    "axisAlpha": 0,
                    "position": "left"
                }],
                categoryAxis: {
                    "gridPosition": "start",
                    "axisAlpha": 0,
                    "tickLength": 0
                },
                type: 'serial',
            })

            var chart = AmCharts.makeChart(config.container, {
                "type": config.type,
                "addClassNames": true,
                "theme": "light",
                "path": "../assets/global/plugins/amcharts/ammap/images/",
                "autoMargins": true,
                "balloon": {
                    "adjustBorderColor": false,
                    "horizontalPadding": 10,
                    "verticalPadding": 8,
                    "color": "#ffffff"
                },

                "dataProvider": config.dataProvider,
                "valueAxes": config.valueAxes,
                //"startDuration": 1,
                "graphs": config.graphs,
                "categoryField": config.categoryField,
                "categoryAxis": config.categoryAxis,
                "export": {
                    "enabled": true
                },
                legend: {
                    bulletType: "round",
                    equalWidths: false,
                    valueWidth: 120,
                    useGraphSettings: true,
                    color: "#6c7b88"
                }
            });
        },

        addText: function (elemento, valor) {
            var elemento_dom = document.getElementById(elemento);
            if (document.selection) {
                elemento_dom.focus();
                sel = document.selection.createRange();
                sel.text = valor;
                return;
            }
            if (elemento_dom.selectionStart || elemento_dom.selectionStart == "0") {
                var t_start = elemento_dom.selectionStart;
                var t_end = elemento_dom.selectionEnd;
                var val_start = elemento_dom.value.substring(0, t_start);
                var val_end = elemento_dom.value.substring(t_end, elemento_dom.value.length);
                elemento_dom.value = val_start + valor + val_end;
            } else {
                elemento_dom.value += valor;
            }
        },

        months: function (index, short = false, indo = 'en') {
            var month1 = { 'en': ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'], 'in': ['', 'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'] };
            var month2 = { 'in': ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], 'in': ['', 'Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'] };
            var month = '';
            if (short) { month = month2[indo][index] } else { month = month1[indo][index] }
            // if (short){month=month2[index][indo]}else{month=month1[index][indo]}
            return month;
        },

        days: function (index, short = false) {
            var day1 = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            var day2 = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
            var day = '';
            if (short) { day = day2[index.getDay()] } else { day = day1[index.getDay()] }
            return day;
        },

        reset_format: function (_number) {
            var number = numeral(_number.toString().replace(/,/g, ''));
            return number.value();
        },

        number_format: function (_number) {
            if (_number == null || isNaN(_number)) {
                _number = 0;
            }

            var number = numeral(_number.toString().replace(/,/g, ''));
            var num = number.format('0,0.00');
            return num;
        },

        toInteger: function (_number, _default = 0) {
            return isNaN(parseInt(_number, 10)) ? _default : parseInt(_number, 10);
        },

        toFixed: function (n, fixed) {
            return `${n}`.match(new RegExp(`^-?\\d+(?:\.\\d{0,${fixed}})?`))[0];
        },

        protect_email: function (user_email) {
            var avg, splitted, part1, part1_2, part2, part2_1, part3;
            splitted = user_email.split("@");
            part1 = splitted[0];
            avg = part1.length / 2;
            length = part1.length;
            part1 = part1.substring(0, (part1.length - avg));
            part1_2 = "";
            for (var i = 0; i <= length - avg; i++) {
                part1_2 += "*";
            };
            part2 = splitted[1].split('.');
            part3 = part2.pop();
            part2 = part2.join('');
            avg = part2.length / 2;
            length = part2.length;
            part2 = part2.substring(0, (part2.length - avg));
            part2_2 = "";
            for (var i = 0; i <= length - avg; i++) {
                part2_2 += "*";
            };
            return part1 + part1_2 + "@" + part2 + part2_2 + "." + part3;
        },

        colorIsDark: function (color) {

            // Check the format of the color, HEX or RGB?
            if (color.match(/^rgb/)) {

                // If HEX --> store the red, green, blue values in separate variables
                color = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);

                r = color[1];
                g = color[2];
                b = color[3];
            }
            else {

                // If RGB --> Convert it to HEX: http://gist.github.com/983661
                color = +("0x" + color.slice(1).replace(
                    color.length < 5 && /./g, '$&$&'
                )
                );

                r = color >> 16;
                g = color >> 8 & 255;
                b = color & 255;
            }

            // HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
            hsp = Math.sqrt(
                0.299 * (r * r) +
                0.587 * (g * g) +
                0.114 * (b * b)
            );

            // Using the HSP value, determine whether the color is light or dark
            if (hsp > 127.5) {

                return false;
            }
            else {

                return true;
            }
        },

        text_truncate: function (str, length = null, ending = null) {
            str = HELPER.nullConverter(str);
            if (length == null) {
                length = 100;
            }
            if (ending == null) {
                ending = '...';
            }
            if (str.length > length) {
                return str.substring(0, length - ending.length) + ending;
            } else {
                return str;
            }
        },

        textMore: function (config) {
            config = $.extend(true, {
                text: '-',
                length: 50,
                ending: '...',
                btn_text: 'Lihat banyak',
                btn_text_reverse: 'Lihat sedikit',
                reverse: false,
                fromReverse: false,
                from: 1,
                callbackClick: function () { },
            }, config);
            var str = HELPER.nullConverter(config.text)
            var btn_click = "";
            var btn_click_reverse = "";
            if (str.length > config.length) {
                try {
                    if (config.reverse) {
                        if (config.fromReverse) {
                            config.fromReverse = false;
                            btn_click = `<a href="javascript:void(0)" class="text-aps" data-config="${btoa(JSON.stringify(config))}" onclick="HELPER.clickTextMore(this)" title="${config.btn_text_reverse}">${config.btn_text_reverse}</a>`;
                            str = config.text + " " + btn_click;
                        } else {
                            config.fromReverse = true;
                            var temp_str = HELPER.text_truncate(config.text, config.length, config.ending);
                            btn_click = `<a href="javascript:void(0)" class="text-aps" data-config="${btoa(JSON.stringify(config))}" onclick="HELPER.clickTextMore(this)" title="${config.btn_text}">${config.btn_text}</a>`;
                            str = temp_str + " " + btn_click;
                        }
                    } else {
                        if (config.from) {
                            var temp_str = HELPER.text_truncate(config.text, config.length, config.ending);
                            btn_click = `<a href="javascript:void(0)" class="text-aps" data-config="${btoa(JSON.stringify(config))}" onclick="HELPER.clickTextMore(this)" title="${config.btn_text}">${config.btn_text}</a>`;
                            str = temp_str + " " + btn_click;
                        } else {
                            str = config.text;
                        }
                    }
                } catch (e) {
                    // console.log(e);
                }
            }
            var temp_span = `<span title="${config.text}">${str}</span>`;
            return temp_span;
        },

        clickTextMore: function (el) {
            if ($(el).data().hasOwnProperty('config')) { var config = JSON.parse(atob($(el).data('config'))); config.from = 0; $(el).parent().html(HELPER.textMore(config)) }
        },

        arrayUnique: function (array) {
            var a = array.concat();
            for (var i = 0; i < a.length; ++i) {
                for (var j = i + 1; j < a.length; ++j) {
                    if (a[i] === a[j])
                        a.splice(j--, 1);
                }
            }
            return a;
        },

        setMaxLength: function (config) {
            config = $.extend(true, {
                el: null,
                modal: false,
                maxlength: null,
            }, config);

            if (config.el !== null) {
                var append = false;
                if (config.modal) {
                    append = true;
                }
                if (config.el.constructor === Array) {
                    $.each(config.el, function (i, v) {
                        if (config.maxlength !== null) {
                            $(v).attr('maxlength', config.maxlength);
                        }
                        $(v).maxlength({
                            warningClass: "kt-badge kt-badge--warning kt-badge--rounded kt-badge--inline",
                            limitReachedClass: "kt-badge kt-badge--success kt-badge--rounded kt-badge--inline",
                            appendToParent: append,
                            threshold: 10,
                        });
                    });
                } else {
                    if (config.maxlength !== null) {
                        $(config.el).attr('maxlength', config.maxlength);
                    }
                    $(config.el).maxlength({
                        warningClass: "kt-badge kt-badge--warning kt-badge--rounded kt-badge--inline",
                        limitReachedClass: "kt-badge kt-badge--success kt-badge--rounded kt-badge--inline",
                        appendToParent: append,
                        threshold: 10,
                    });
                }
            }
        },

        settingForm: function (config) {
            config = $.extend(true, {
                el: null,
                modal: false
            }, config);

            if (config.el !== null) {
                var append = false;
                if (config.modal) {
                    append = true;
                }
                if (config.el.constructor === Array) {
                    $.each(config.el, function (i, v) {
                        $(v).maxlength({
                            warningClass: "kt-badge kt-badge--warning kt-badge--rounded kt-badge--inline",
                            limitReachedClass: "kt-badge kt-badge--success kt-badge--rounded kt-badge--inline",
                            appendToParent: append,
                            threshold: 10,
                        });
                    });
                } else {
                    $(config.el).maxlength({
                        warningClass: "kt-badge kt-badge--warning kt-badge--rounded kt-badge--inline",
                        limitReachedClass: "kt-badge kt-badge--success kt-badge--rounded kt-badge--inline",
                        appendToParent: append,
                        threshold: 10,
                    });
                }
            }
        },

        initLoadMore: function (config) {
            config = $.extend(true, {
                el: window,
                perPage: 10,
                urlExist: null,
                dataExist: null,
                callbackExist: function () { },
                urlMore: null,
                dataMore: null,
                callbackMore: function () { },
                callbackEnd: function () { },
                callLoadMore: function () { },
                callBeforeLoad: function () { },
                callAfterLoad: function () { },
                cekLoadMore: function () { },
                countCek: function () { },
            }, config);

            var total_record_data = 0;
            var total_group_data = 0;

            if (config.urlExist !== null) {
                $.ajax({
                    url: config.urlExist,
                    data: $.extend(config.dataExist, {
                        system_csrf_aps_dev: $.cookie('system_csrf_aps_dev')
                    }),
                    type: 'POST',
                    complete: function (response) {

                        var data = $.parseJSON(response.responseText);
                        var myQueue = new Queue();
                        myQueue.enqueue(function (next) {
                            if (data.hasOwnProperty('success')) {
                                total_group_data = 0;
                            } else {
                                total_group_data = data;
                            }
                            config.callbackExist(data);
                            config.callLoadMore()
                            next()
                        }, '1').enqueue(function (next) {
                            setTimeout(function () {
                                config.scrollCek(config.callLoadMore);
                            }, 300)
                            next();
                        }, '2').dequeueAll();
                    },
                    error: function () {
                        HELPER.unblock()
                    }
                });
            }
            else {
                var response = { success: false, message: 'Url kosong' };
                config.callback(response);
            }

            config.callLoadMore = function () {
                if (total_record_data <= total_group_data) {
                    var heightWindow = window.scrollY;
                    config.callBeforeLoad()
                    $.ajax({
                        url: config.urlMore,
                        data: $.extend(config.dataMore, {
                            start: total_record_data,
                            limit: config.perPage,
                            system_csrf_aps_dev: $.cookie('system_csrf_aps_dev')
                        }),
                        type: 'POST',
                        complete: function (responseMore) {
                            var dataMore = responseMore;
                            var myQueueMore = new Queue();
                            myQueueMore.enqueue(function (next) {
                                total_record_data += config.perPage;
                                next()
                            }, '1m').enqueue(function (next) {
                                config.callbackMore(dataMore);
                                if (total_record_data >= total_group_data) {
                                    config.callbackEnd(dataMore)
                                }
                                next();
                            }, '2m').enqueue(function (next) {
                                window.scrollTo(0, heightWindow)
                                config.callAfterLoad()
                                next()
                            }, '3m').dequeueAll();
                        },
                        error: function () {
                            HELPER.unblock()
                            // HELPER.showMessage()
                        }
                    });
                }
            }
        },

        unsetArray: function (arr, item) {
            var index = arr.indexOf(item);
            if (index !== -1) arr.splice(index, 1);
            return arr;
        },

        populateForm: function (frm, data) {
            $.each(data, function (key, value) {
                var $ctrl = $('[name="' + key + '"]', frm);
                if ($ctrl.is('select')) {
                    if ($ctrl.data().hasOwnProperty('select2')) {
                        $ctrl.val(value).trigger('change');
                    } else {
                        $("option", $ctrl).each(function () {
                            if (this.value == value) {
                                this.selected = true;
                            }
                        });
                    }
                } else {
                    switch ($ctrl.attr("type")) {
                        case "text":
                        case "email":
                        case "number":
                        case "hidden":
                        case "textarea":
                            $ctrl.val(value);
                            break;
                        case "radio":
                        case "checkbox":
                            $ctrl.each(function () {
                                if ($(this).attr('value') == value) {
                                    $(this).prop('checked', true)
                                }
                            });
                            break;
                    }
                }
            });
        },

        detailmodal: function (modal, data) {
            $.each(data, function (key, value) {
                $('.detail-' + key).html(value);
            });
            if (modal) {
                $(modal).modal('show');
            }
        },

        convertK: function (num, digits = 1, lang = "id") {
            var si = [
                { value: 1, symbol: "" },
                { value: 1E3, symbol: lang == "id" ? "rb" : "k" },
                { value: 1E6, symbol: lang == "id" ? "jt" : "M" },
                { value: 1E9, symbol: lang == "id" ? "M" : "G" },
                { value: 1E12, symbol: lang == "id" ? "T" : "T" },
                { value: 1E15, symbol: lang == "id" ? "P" : "P" },
                { value: 1E18, symbol: lang == "id" ? "E" : "E" }
            ];
            var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
            var i;
            for (i = si.length - 1; i > 0; i--) {
                if (num >= si[i].value) {
                    break;
                }
            }
            return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
        },

        convertSimpleK: function (labelValue) {
            // Nine Zeroes for Billions
            return Math.abs(Number(labelValue)) >= 1.0e+9

                ? Math.abs(Number(labelValue)) / 1.0e+9 + "M"
                // Six Zeroes for Millions 
                : Math.abs(Number(labelValue)) >= 1.0e+6

                    ? Math.abs(Number(labelValue)) / 1.0e+6 + "Jt"
                    // Three Zeroes for Thousands
                    : Math.abs(Number(labelValue)) >= 1.0e+3

                        ? Math.abs(Number(labelValue)) / 1.0e+3 + "Rb"

                        : Math.abs(Number(labelValue));
        },

        chainModal: function (config) {
            config = $.extend(true, {
                el: null,
                tohide: null,
            }, config);

            if (config.el && config.tohide) {
                $(config.el).modal('show')
                $(config.el).off('hide.bs.modal')
                setTimeout(function () {
                    $(config.tohide).modal('hide')
                    $(config.el).on('hide.bs.modal', function (e) {
                        $(config.tohide).modal('show')
                        setTimeout(function () {
                            $(config.el).off('hide.bs.modal')
                        }, 300)
                    });
                }, 200)
            }
        },

        padLeft: function (nr = 1, n = 8, str) {
            return Array(n - String(nr).length + 1).join(str || '0') + nr;
        },

        fileInput: function (config) {
            config = $.extend(true, {
                el: null,
                useCrop: false,
                widthPreview: '200px',
                heightPreview: null,
                aspectRatio: NaN,
                cropBoxResizable: true,
                viewMode: 0,
                callbackSetCrop: function () { }
            }, config);

            if (config.el == null) { return; }

            var avatar5 = new KTImageInput(config.el, config);
            var cropperImg = null;
            if (config.useCrop) {
                var btnSetCrop = "btnSetCrop-" + config.el;
                var modalCrop = "modalCrop-" + config.el;
                if ($('#' + modalCrop).length > 0) {
                    $('#' + modalCrop).remove()
                }
                $('#content_data').append(`
                    <div class="modal fade" id="${modalCrop}" tabindex="-1" role="dialog" aria-hidden="true">
                        <div class="modal-dialog modal-lg" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title">Crop</h5>
                                    <button type="button" class="btn btn-primary font-weight-bold" id="${btnSetCrop}">Crop</button>
                                </div>
                                <div class="modal-body" style="max-width: 90%">
                                    <img src="" style="max-width:100%">
                                </div>
                            </div>
                        </div>
                    </div>
                `)
                setTimeout(function () {
                    $('#' + modalCrop).off()
                    $('#' + config.el).find('.image-input-wrapper').after('<div class="image-input-wrapper-custom" style="display: none;"><img src="" style="width:100%"></div>')
                    avatar5.on('change', function (params) {
                        $('#' + btnSetCrop).off();
                        var reader = new FileReader();
                        reader.onload = function (e) {
                            $('#' + modalCrop).find('img').attr('src', e.target.result);
                        }
                        reader.readAsDataURL(params.input.files[0]);
                        setTimeout(function () {
                            $('#' + modalCrop).modal('show')
                            $('#' + modalCrop).on('shown.bs.modal', function () {
                                var image = $('#' + modalCrop).find('img')[0];
                                if (cropperImg) {
                                    image = $('#' + modalCrop).find('img').attr('src')
                                    cropperImg.replace(image)
                                } else {
                                    cropperImg = new Cropper(image, config);
                                }
                                $('#' + btnSetCrop).on('click', function () {
                                    var result = cropperImg.getCroppedCanvas().toDataURL()
                                    cropperImg.getCroppedCanvas().toBlob(function (blob) {
                                        config.callbackSetCrop(blob)
                                    })
                                    setTimeout(function () {
                                        $('#' + config.el).find('.image-input-wrapper-custom').show().find('img').attr('src', result)
                                        $('#' + config.el).find('.image-input-wrapper').hide()
                                        $('#' + modalCrop).modal('hide')
                                    }, 300)
                                });
                            })
                        }, 300)
                    });
                }, 300)
            }
            return avatar5;
        },

        uuid: function () {
            var d = new Date().getTime();//Timestamp
            var d2 = (performance && performance.now && (performance.now() * 1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16;//random number between 0 and 16
                if (d > 0) {//Use timestamp until depleted
                    r = (d + r) % 16 | 0;
                    d = Math.floor(d / 16);
                } else {//Use microseconds since page-load if supported
                    r = (d2 + r) % 16 | 0;
                    d2 = Math.floor(d2 / 16);
                }
                return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
            });
        },

        download: function (url, filename) {
            fetch(url).then(function (t) {
                return t.blob().then((b) => {
                    var a = document.createElement("a");
                    a.href = URL.createObjectURL(b);
                    a.setAttribute("download", filename);
                    a.click();
                }
                );
            });
        },

        editor: function (config) {
            config = $.extend(true, {
                el: null,
                toolbar: null,
                path: null,
                placeholder: null,
                callback: function () { },
                error: function () { }
            }, config);

            var toolbar = (config.toolbar != null) ? config : ['bold', 'italic', 'link', 'undo', 'redo', 'numberedList', 'bulletedList', 'imageUpload', 'insertTable'];

            InlineEditor
                .create(document.querySelector("#" + config.el), {
                    ckfinder: {
                        uploadUrl: config.path,
                    },
                    placeholder: ((config.placeholder != null) ? config.placeholder : 'Input Catatan'),
                    toolbar: toolbar,
                }).then(editor => {
                    config.callback(editor)
                }).catch(error => {
                    config.error(error);
                });
        },
        blockdiv: function (target, options) {
            var el = $(target);

            options = $.extend(true, {
                opacity: 0.4,
                overlayColor: '#ffffff',
                type: '',
                size: '',
                state: 'primary',
                centerX: true,
                centerY: true,
                message: '',
                shadow: true,
                width: 'auto'
            }, options);

            var html;
            var version = options.type ? 'spinner-' + options.type : '';
            var state = options.state ? 'spinner-' + options.state : '';
            var size = options.size ? 'spinner-' + options.size : '';
            // var spinner = '<span class="spinner ' + version + ' ' + state + ' ' + size + '"></span';
            var spinner = '';

            if (options.message && options.message.length > 0) {
                var classes = 'blockui ' + (options.shadow === false ? 'blockui' : '');

                html = '<div class="' + classes + '"><span>' + options.message + '</span>' + spinner + '</div>';

                var el = document.createElement('div');

                $('body').prepend(el);
                KTUtil.addClass(el, classes);
                el.innerHTML = html;
                options.width = KTUtil.actualWidth(el) + 10;
                KTUtil.remove(el);

                if (target == 'body') {
                    html = '<div class="' + classes + '" style="margin-left:-' + (options.width / 2) + 'px;"><span>' + options.message + '</span><span>' + spinner + '</span></div>';
                }
            } else {
                html = spinner;
            }

            var params = {
                message: html,
                centerY: options.centerY,
                centerX: options.centerX,
                css: {
                    top: '30%',
                    left: '50%',
                    border: '0',
                    padding: '0',
                    backgroundColor: 'none',
                    width: options.width
                },
                overlayCSS: {
                    backgroundColor: options.overlayColor,
                    opacity: options.opacity,
                    cursor: 'auto',
                    zIndex: (target == 'body' ? 1100 : 10)
                },
                onUnblock: function () {
                    if (el && el[0]) {
                        KTUtil.css(el[0], 'position', '');
                        KTUtil.css(el[0], 'zoom', '');
                    }
                }
            };

            if (target == 'body') {
                params.css.top = '50%';
                $.blockUI(params);
            } else {
                var el = $(target);
                el.block(params);
            }
        },

        unblockdiv: function (target) {
            if (target && target != 'body') {
                $(target).unblock();
            } else {
                $.unblockUI();
            }
        },

        status: function () {

        }
    }
}();

$.fn.serializeObject = function () {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function () {
        if (o[this.name]) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

$.fn.randBetween = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

var tableToExcel = (function () {
    var uri = 'data:application/vnd.ms-excel;base64,'
        , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'
        , base64 = function (s) { return window.btoa(unescape(encodeURIComponent(s))) }
        , format = function (s, c) { return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; }) }
    return function (table, name) {
        if (!table.nodeType) table = document.getElementById(table)
        var ctx = { worksheet: name || 'Worksheet', table: table.innerHTML }
        // window.location.href = uri + base64(format(template, ctx))
        var dataFormat = uri + base64(format(template, ctx));
        var $a = $("<a>");
        $a.attr("href", dataFormat);
        $('body').append($a);
        $a.attr("download", name + '.xls');
        $a[0].click();
        $a.remove();
    }
})();

function paperSize(data_tipe) {
    var tipe = data_tipe.toUpperCase();
    switch (tipe) {
        case 'A4': return '21cm 29.7cm'; break;
        case 'LETTER': return '21.6cm 27.9cm'; break;
        case 'LEGAL': return '21.6cm 35.6cm'; break;
        case 'FOLIO': return '21.5cm 33.0cm'; break;
        case 'A0': return '84.1cm 118.9cm'; break;
        case 'A1': return '59.4cm 84.1cm'; break;
        case 'A2': return '42.0cm 59.4cm'; break;
        case 'A3': return '29.7cm 42.0cm'; break;
        case 'A4': return '21.0cm 29.7cm'; break;
        case 'A5': return '14.8cm 21.0cm'; break;
        case 'A6': return '10.5cm 14.8cm'; break;
        case 'A7': return '7.4cm 10.5cm'; break;
        case 'A8': return '5.2cm 7.4cm'; break;
        case 'A9': return '3.7cm 5.2cm'; break;
        case 'A10': return '2.6cm 3.7cm'; break;
        case 'B0': return '100.0cm 141.4cm'; break;
        case 'B1': return '70.7cm 100.0cm'; break;
        case 'B2': return '50.0cm 70.7cm'; break;
        case 'B3': return '35.3cm 50.0cm'; break;
        case 'B4': return '25.0cm 35.3cm'; break;
        case 'B5': return '17.6cm 25.0cm'; break;
        case 'B6': return '12.5cm 17.6cm'; break;
        case 'B7': return '8.8cm 12.5cm'; break;
        case 'B8': return '6.2cm 8.8cm'; break;
        case 'B9': return '4.4cm 6.2cm'; break;
        case 'B10': return '3.1cm 4.4cm'; break;
    }
}


Number.prototype.round = function (places) {
    return +(Math.round(this + "e+" + places) + "e-" + places);
}
function Queue() {
    this.queue = [];
}

Queue.prototype = {
    constructor: Queue,
    enqueue: function (fn, queueName) {
        this.queue.push({
            name: queueName || 'global',
            fn: fn || function (next) {
                next()
            }
        });
        return this
    },
    dequeue: function (queueName) {
        var allFns = (!queueName) ? this.queue : this.queue.filter(function (current) {
            return (current.name === queueName)
        });
        var poppedFn = allFns.pop();
        if (poppedFn) poppedFn.fn.call(this);
        return this
    },
    dequeueAll: function (queueName) {
        var instance = this;
        var queue = this.queue;
        var allFns = (!queueName) ? this.queue : this.queue.filter(function (current) {
            return (current.name === queueName)
        });
        (function recursive(index) {
            var currentItem = allFns[index];
            if (!currentItem) return;
            currentItem.fn.call(instance, function () {
                queue.splice(queue.indexOf(currentItem), 1);
                recursive(index)
            })
        }(0));
        return this
    }
};

$.fn.extend({
    donetyping: function (callback, timeout) {
        timeout = timeout || 1e3; // 1 second default timeout
        var timeoutReference,
            doneTyping = function (el) {
                if (!timeoutReference) return;
                timeoutReference = null;
                callback.call(el);
            };
        return this.each(function (i, el) {
            var $el = $(el);
            // Chrome Fix (Use keyup over keypress to detect backspace)
            // thank you @palerdot
            $el.off('keyup keypress paste blur change')
            $el.is(':input') && $el.on('keyup keypress paste', function (e) {
                // This catches the backspace button in chrome, but also prevents
                // the event from triggering too preemptively. Without this line,
                // using tab/shift+tab will make the focused element fire the callback.
                if (e.type == 'keyup' && e.keyCode != 8) return;

                // Check if timeout has been set. If it has, "reset" the clock and
                // start over again.
                if (timeoutReference) clearTimeout(timeoutReference);
                timeoutReference = setTimeout(function () {
                    // if we made it here, our timeout has elapsed. Fire the
                    // callback
                    doneTyping(el);
                }, timeout);
            }).on('blur', function () {
                // If we can, fire the event since we're leaving the field
                doneTyping(el);
            }).on('change', function () {
                /*if (timeoutReference) clearTimeout(timeoutReference);
                timeoutReference = setTimeout(function(){
                    doneTyping(el);
                }, timeout);*/
            });
        });
    }
});