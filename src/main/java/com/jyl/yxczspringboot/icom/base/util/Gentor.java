package com.jyl.yxczspringboot.icom.base.util;

import org.mybatis.generator.api.MyBatisGenerator;
import org.mybatis.generator.config.Configuration;
import org.mybatis.generator.config.xml.ConfigurationParser;
import org.mybatis.generator.exception.InvalidConfigurationException;
import org.mybatis.generator.exception.XMLParserException;
import org.mybatis.generator.internal.DefaultShellCallback;

import java.io.File;
import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class Gentor {
    public static void main(String[] args) throws InvalidConfigurationException, IOException, XMLParserException {
        List<String> warnings = new ArrayList<String>();
        boolean overwrite = true;
      //  File configFile = new File("H:\\ideaProject\\yxcz-springboot\\src\\main\\resources\\generator\\generatorConfig.xml");
        File configFile = new File("F:\\ideaProject\\yxcz-springboot\\jyl\\src\\main\\resources\\generator\\generatorConfig.xml");
        ConfigurationParser cp = new ConfigurationParser(warnings);
        Configuration config = cp.parseConfiguration(configFile);
        DefaultShellCallback callback = new DefaultShellCallback(overwrite);
        MyBatisGenerator myBatisGenerator = new MyBatisGenerator(config, callback, warnings);
        try {
            myBatisGenerator.generate(null);
        } catch (SQLException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}

