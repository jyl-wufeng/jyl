package com.jyl.yxczspringboot.icom.base.util;

import java.io.File;
import java.util.ArrayList;
import java.util.List;
 
 
import static org.mybatis.generator.internal.util.StringUtility.stringHasValue;
import static org.mybatis.generator.internal.util.messages.Messages.getString;
 
import org.mybatis.generator.api.GeneratedJavaFile;
import org.mybatis.generator.api.IntrospectedTable;
import org.mybatis.generator.api.JavaFormatter;
import org.mybatis.generator.api.PluginAdapter;
import org.mybatis.generator.api.ShellCallback;
import org.mybatis.generator.api.dom.java.CompilationUnit;
import org.mybatis.generator.api.dom.java.FullyQualifiedJavaType;
import org.mybatis.generator.api.dom.java.Interface;
import org.mybatis.generator.api.dom.java.JavaVisibility;
import org.mybatis.generator.api.dom.xml.Attribute;
import org.mybatis.generator.api.dom.xml.Document;
import org.mybatis.generator.api.dom.xml.TextElement;
import org.mybatis.generator.api.dom.xml.XmlElement;
import org.mybatis.generator.exception.ShellException;
import org.mybatis.generator.internal.DefaultShellCallback;
 
/**   
 * @Title: MapperPlugin.java 
 * @Package org.mybatis.generator.plugins 
 * @Description: TODO
 * @author fendo
 * @date 2017年12月2日 下午5:35:14 
 * @version V1.0   
*/
public class MapperPlugin extends PluginAdapter{
 
    private static final String DEFAULT_DAO_SUPER_CLASS = "com.jyl.yxczspringboot.icom.base.mapper.BaseMapper";
    private static final String DEFAULT_EXPAND_DAO_SUPER_CLASS = "com.jyl.yxczspringboot.icom.base.mapper.BaseMapper";
    private String daoTargetDir;
    private String daoTargetPackage;
 
    private String daoSuperClass;
 
    // 扩展
    private String expandDaoTargetPackage;
    private String expandDaoSuperClass;
 
    private ShellCallback shellCallback = null;
 
    public MapperPlugin() {
        shellCallback = new DefaultShellCallback(false);
    }
 
    /**
     * 验证参数是否有效
     * @param warnings
     * @return
     */
    public boolean validate(List<String> warnings) {
        daoTargetDir = properties.getProperty("targetProject");
        System.out.println(daoTargetDir);
        boolean valid = stringHasValue(daoTargetDir);
 
        daoTargetPackage = properties.getProperty("targetPackage");
        boolean valid2 = stringHasValue(daoTargetPackage);
 
        daoSuperClass = properties.getProperty("daoSuperClass");
        if (!stringHasValue(daoSuperClass)) {
            daoSuperClass = DEFAULT_DAO_SUPER_CLASS;
        }
 
        expandDaoTargetPackage = properties.getProperty("expandTargetPackage");
        expandDaoSuperClass = properties.getProperty("expandDaoSuperClass");
        if (!stringHasValue(expandDaoSuperClass)) {
            expandDaoSuperClass = DEFAULT_EXPAND_DAO_SUPER_CLASS;
        }
        System.out.println(valid && valid2);
        return valid && valid2;
    }
 
    
    /** 
     * 生成mapping 添加自定义sql 
     */ 
    @Override
    public boolean sqlMapDocumentGenerated(Document document, IntrospectedTable introspectedTable) {
    	
    	//创建Select查询
        XmlElement select = new XmlElement("select");
        select.addAttribute(new Attribute("id", "selectAll"));
        select.addAttribute(new Attribute("resultMap", "BaseResultMap"));
        select.addAttribute(new Attribute("parameterType", introspectedTable.getBaseRecordType()));
        select.addElement(new TextElement("select * from "+ introspectedTable.getFullyQualifiedTableNameAtRuntime()));

        select.addElement(new XmlElement("where"));





        XmlElement queryPage = new XmlElement("select");
        queryPage.addAttribute(new Attribute("id", "queryPage"));
        queryPage.addAttribute(new Attribute("resultMap", "BaseResultMap"));
        queryPage.addAttribute(new Attribute("parameterType", "com.fendo.bean.Page"));
        queryPage.addElement(new TextElement("select * from "+ introspectedTable.getFullyQualifiedTableNameAtRuntime()));
        
        XmlElement parentElement = document.getRootElement();
        parentElement.addElement(select);
        parentElement.addElement(queryPage);
        return super.sqlMapDocumentGenerated(document, introspectedTable);
    }
 
    public List<GeneratedJavaFile> contextGenerateAdditionalJavaFiles(IntrospectedTable introspectedTable) {
        JavaFormatter javaFormatter = context.getJavaFormatter();
        List<GeneratedJavaFile> mapperJavaFiles = new ArrayList<GeneratedJavaFile>();
        for (GeneratedJavaFile javaFile : introspectedTable.getGeneratedJavaFiles()) {
            CompilationUnit unit = javaFile.getCompilationUnit();
            FullyQualifiedJavaType baseModelJavaType = unit.getType();
 
            String shortName = baseModelJavaType.getShortName();
 
            GeneratedJavaFile mapperJavafile = null;

            if (shortName.endsWith("Mapper")) { // 扩展Mapper
                if (stringHasValue(expandDaoTargetPackage)) {
                    Interface mapperInterface = new Interface(
                            expandDaoTargetPackage + "." + shortName.replace("Mapper", "ExpandMapper"));
                    mapperInterface.setVisibility(JavaVisibility.PUBLIC);
                    mapperInterface.addJavaDocLine("/**");
                    mapperInterface.addJavaDocLine(" * " + shortName + "扩展");
                    mapperInterface.addJavaDocLine(" */");

                    FullyQualifiedJavaType daoSuperType = new FullyQualifiedJavaType(expandDaoSuperClass);
                    mapperInterface.addImportedType(daoSuperType);
                    mapperInterface.addSuperInterface(daoSuperType);

                    mapperJavafile = new GeneratedJavaFile(mapperInterface, daoTargetDir, javaFormatter);
                    try {
                        File mapperDir = shellCallback.getDirectory(daoTargetDir, daoTargetPackage);
                        File mapperFile = new File(mapperDir, mapperJavafile.getFileName());
                        // 文件不存在
                        if (!mapperFile.exists()) {
                            mapperJavaFiles.add(mapperJavafile);
                        }
                    } catch (ShellException e) {
                        e.printStackTrace();
                    }
                }
            } else if (!shortName.endsWith("Example")) { // CRUD Mapper
                Interface mapperInterface = new Interface(daoTargetPackage + "." + shortName + "Mapper");
 
                mapperInterface.setVisibility(JavaVisibility.PUBLIC);
                mapperInterface.addJavaDocLine("/**");
                mapperInterface.addJavaDocLine(" * MyBatis Generator工具自动生成");
                mapperInterface.addJavaDocLine(" */");
 
                FullyQualifiedJavaType daoSuperType = new FullyQualifiedJavaType(daoSuperClass);
                // 添加泛型支持
                daoSuperType.addTypeArgument(baseModelJavaType);
                mapperInterface.addImportedType(baseModelJavaType);
                mapperInterface.addImportedType(daoSuperType);
                mapperInterface.addSuperInterface(daoSuperType);
 
                mapperJavafile = new GeneratedJavaFile(mapperInterface, daoTargetDir, javaFormatter);
                mapperJavaFiles.add(mapperJavafile);
 
            }
        }
        return mapperJavaFiles;
    }
	
}

