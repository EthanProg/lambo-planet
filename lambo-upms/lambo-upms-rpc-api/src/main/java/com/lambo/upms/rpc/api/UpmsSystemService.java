package com.lambo.upms.rpc.api;

import com.lambo.common.base.BaseService;
import com.lambo.upms.dao.model.UpmsSystem;
import com.lambo.upms.dao.model.UpmsSystemExample;

/**
* UpmsSystemService接口
* Created by lambo on 2017/3/20.
*/
public interface UpmsSystemService extends BaseService<UpmsSystem, UpmsSystemExample> {

    /**
     * 根据name获取UpmsSystem
     * @param name
     * @return
     */
    UpmsSystem selectUpmsSystemByName(String name);

}